const router = require("express").Router();
const {
  models: { Project, UserProjects, User, List, Card },
} = require("../db");

module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const allProjects = async (req, res, next) => {
  try {
    const allProjects = await Project.findAll();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
};

const getProjectsByUser = async (req, res, next) => {
  try {
    const projects = await UserProjects.findAll({
      where: { userId: req.user.id },
    });
    const user = await User.findByPk(req.user.id, {
      include: Project,
    });
    const assigned = user.projects;

    res.json(assigned);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await Project.create({ ...req.body, id: req.user.id });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const getSingleProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    res.send(project);
  } catch (err) {
    next(err);
  }
};
// GET /api/:projectId/lists
// GET all lists with their assigned cards
router.get("/:projectId/lists", requireToken, async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: {
        projectId: req.params.projectId,
      },
      include: Card,
    });
    console.log("list proto>>>>", lists);
    res.json(lists);
  } catch (error) {
    next(error);
  }
});

router.get("/", allProjects);
router.get("/user-projects", requireToken, getProjectsByUser);
router.get("/:projectId", requireToken, getSingleProject);
