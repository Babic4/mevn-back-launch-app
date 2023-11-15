const { Router } = require("express");
const router = Router();

const checkJWTSign = require("../middlewares/jwtCheck.middleware");
const admin = require("../controllers/admin.controller");

router.get("/projects", admin.getNewProjects);

module.exports = router;
