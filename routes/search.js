const { Router } = require("express");
const router = Router();

const search = require("../controllers/search.controller");

router.get("/projects/:text", search.searchProjects);

router.get("/users/:text", search.searchUsers);

module.exports = router;
