const { Router } = require("express");
const router = Router();

const { checkJWTSign } = require("../middlewares/jwtCheck.middleware");
const comment = require("../controllers/comment.controller");

router.post("/", checkJWTSign, comment.create);

router.get("/", comment.getAll);

router.get("/project/:projectId", comment.getCommentsPr);

router.get("/:id", comment.get);

router.put("/:id", comment.update);

router.delete("/:id", checkJWTSign, comment.delete);

module.exports = router;
