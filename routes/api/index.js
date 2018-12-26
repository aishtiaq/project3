const router = require("express").Router();
const tasksRoutes = require("./tasks");
const usersRoutes = require("./users");

router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes);

module.exports = router;
