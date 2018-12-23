const router = require("express").Router();
const appController = require("../../controllers/userController");


router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/currentUser").post(userController.currentUser);

module.exports = router;
