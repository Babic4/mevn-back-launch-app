const { Router } = require("express");
const router = Router();

const { checkJWTSign } = require("../middlewares/jwtCheck.middleware");
const upload = require("../controllers/upload.controller");

router.post("/image", checkJWTSign, upload.uploadImg, upload.uploadImage);

module.exports = router;
