const { Router } = require("express");
const router = Router();

// const router = require("express-promise-router")();

const category = require("../controllers/category.controller");

router.post("/", category.create);

router.get("/", category.getAll);

router.get("/:id", category.get);

router.put("/:id", category.update);

router.delete("/:id", category.delete);

// router.route("/").post(category.create);

// router.route("/").get(category.getAll);

// router.route("/:id").get(category.get);

// router.route("/:id").put(category.update);

// router.route("/:id").delete(category.delete);

module.exports = router;
