const { Router } = require("express");
const router = Router();

const { checkJWTSign } = require("../middlewares/jwtCheck.middleware");
const favorit = require("../controllers/favorit.controller");

router.post("/", checkJWTSign, favorit.create);

router.get("/", favorit.getAll);

// router.get("/:id", favorit.get);

router.get("/:userId", checkJWTSign, favorit.getFavoritsUs);

router.get("/:userId/:projectId", checkJWTSign, favorit.getFavoritUsPr);

router.put("/:id", favorit.update);

router.delete("/:id", checkJWTSign, favorit.delete);

module.exports = router;
