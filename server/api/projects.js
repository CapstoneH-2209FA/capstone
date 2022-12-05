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

// const getSingleProject = async (req, res, next) => {
//   try {
//     const project = await Project.findByPk(req.params.projectId);
//     res.send(project);
//   } catch (err) {
//     next(err);
//   }
// };

const getSingleProject = async (req, res, next) => {
  try {
    const userProject = await UserProjects.findOne({
      where: { projectId: req.params.projectId },
    });
    const project = await Project.findByPk(req.params.projectId, {
      include: User,
      where: { userId: userProject.userId },
    });
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
      include: [{ model: Card }],
      order: [
        ["id", "ASC"],
        [Card, "cardindex", "ASC"],
      ],
      // ^^ MIGHT NOT WORK WAS WE INCORPORATE DRAG N DROP (beautiful)
    });
    res.json(lists);
  } catch (error) {
    next(error);
  }
});

// POST /api/projects
// Create a project button
router.post("/", requireToken, async (req, res, next) => {
  try {
    const project = await Project.create({
      title: req.body.title,
    });
    await List.bulkCreate([
      { title: "To Do", projectId: project.id },
      { title: "Doing", projectId: project.id },
      { title: "Done", projectId: project.id },
    ]);
    const assignProject = await UserProjects.create({
      userId: req.user.id,
      projectId: project.id,
    });
    res.json(assignProject);
  } catch (err) {
    next(err);
  }
});

router.get("/", allProjects);
router.get("/user-projects", requireToken, getProjectsByUser);
router.get("/:projectId", requireToken, getSingleProject);
