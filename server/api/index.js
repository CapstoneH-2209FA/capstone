const router = require("express").Router();
const { readdirSync } = require("fs");
module.exports = router;

// readdirSync("./server/api/routes").map((r) =>
//   router.use(`/${r}`, require("./routes/" + r))
// );

router.use("/lists", require("./lists"));
router.use("/projects", require("./projects"));
router.use("/users", require("./users"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
