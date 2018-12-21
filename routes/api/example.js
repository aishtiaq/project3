const router = require("express").Router();
const appController = require("../../controllers/appController");


router.route("/")
  .get()
  .post();


router
  .route("/:id")
  .get()
  .put()
  .delete();

module.exports = router;
