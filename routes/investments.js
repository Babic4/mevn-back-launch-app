const { Router } = require("express");
const router = Router();

const { checkJWTSign } = require("../middlewares/jwtCheck.middleware");
const investment = require("../controllers/investment.controller");

router.post("/", checkJWTSign, investment.create);

router.get("/payment/:projectId/:userId", investment.getInvestment);

router.get("/", investment.getAll);

router.get("/project/:projectId", investment.getInvestmentsProject);

router.get("/user/:userId", investment.getInvestmentUser);

router.get("/:id", investment.get);

router.put("/:id", checkJWTSign, investment.update);

router.delete("/:id", investment.delete);

module.exports = router;
