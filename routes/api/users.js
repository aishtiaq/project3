const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../config/passport");

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
// router.route("/currentUser").post(userController.currentUser);
router.route("/").get(passport.isAuthenticated,userController.findAll);

// Matches with api/users/id
router
  .route("/:id").put(passport.isAuthenticated,userController.updateUser);

module.exports = router;
