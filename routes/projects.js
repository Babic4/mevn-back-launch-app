const { Router } = require("express");
const router = Router();

const { checkJWTSign } = require("../middlewares/jwtCheck.middleware");
const project = require("../controllers/project.controller");

// console.log(project);

router.post("/", checkJWTSign, project.create);

router.get("/", project.getAll);

router.get("/published", project.getPublishedProjects);

router.get("/draft/:userId", project.getDraftProjects);

router.get("/:id", project.get);

router.get("/user/:userId", project.getProjectUs);

router.get("/filter/:category", project.filterCategory);

router.get("/notification/:userId", project.checkNotification);

router.put("/remove-notification/", project.removeNotification);

router.put("/:id", checkJWTSign, project.uploadImg, project.update);

router.delete("/:id", checkJWTSign, project.delete);

module.exports = router;
