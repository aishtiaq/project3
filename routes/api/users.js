const router = require("express").Router();
const userController = require("../../controllers/userController");


router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/currentUser").post(userController.currentUser);
router.route("/").get(userController.findAll);

module.exports = router;
