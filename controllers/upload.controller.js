const boom = require("boom");
const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "./public/uploads/img/");
  },
  filename: function (_, file, cb) {
    cb(
      null,
      Date.now() + file.originalname.slice(file.originalname.indexOf("."))
    );
  },
});

const uploadImg = multer({ storage: storageConfig }).single("image");

const uploadImage = async ({ file }, response) => {
  try {
    return response.status(200).send(file.path);
  } catch (error) {
    console.log(error);
    return response.status(400).send(boom.boomify(error));
  }
};

module.exports = { uploadImg, uploadImage };
