const { Router } = require("express");
const router = Router();

const authorization = require("../controllers/authorization.controller");

router.post("/login", authorization.login);
router.post("/signup", authorization.signup);
router.post("/refresh", authorization.refreshToken);
router.post("/logout", authorization.logout);

module.exports = router;
