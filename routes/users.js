// const express = require("express");
// const router = express.Router();

const { Router } = require("express");
const router = Router();

const { checkJWTSign } = require("../middlewares/jwtCheck.middleware");
const user = require("../controllers/user.controller");

router.post("/", user.create);

router.get("/", user.getAll);

router.get("/:id", user.get);

router.put("/account/:id", checkJWTSign, user.updateAccount);

router.put("/profile/:id", checkJWTSign, user.uploadImg, user.updateProfile);

router.delete("/:id", user.delete);

module.exports = router;
