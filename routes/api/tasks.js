const router = require("express").Router();
const taskController = require("../../controllers/taskController");
const passport = require("../../config/passport");

router.route("/")
  .get(passport.isAuthenticated,taskController.findAll)
  .post(passport.isAuthenticated,taskController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(passport.isAuthenticated,taskController.findByUserId)
  .put(passport.isAuthenticated,taskController.update)
  .delete(passport.isAuthenticated,taskController.remove);

module.exports = router;
