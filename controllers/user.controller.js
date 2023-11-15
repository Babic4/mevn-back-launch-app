const boom = require("boom");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const genericCrud = require("./generic.controller");
const multer = require("multer");

// update, get?

const storageConfig = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "./public/uploads/img/");
  },
  filename: function ({ params: { id } }, file, cb) {
    cb(
      null,
      Date.now() + id + file.originalname.slice(file.originalname.indexOf("."))
    );
  },
});

const uploadImg = multer({ storage: storageConfig }).single("image");

const exampleFunction = async ({ body }, response) => {}; // Example

const get = async ({ params: { id } }, response) => {
  try {
    const user = await User.findById(id);
    user.password = null; // ???
    return response.status(200).send(user);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

const updateProfile = async ({ params: { id }, body, file }, response) => {
  try {
    if (file) {
      body.image = file.path;
    }
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    return response.status(200).send(user);
  } catch (error) {
    console.log(error);
    return response.status(400).send(boom.boomify(error));
  }
};

const updateAccount = async (
  { params: { id }, body: { currentPassword, data } },
  response
) => {
  try {
    const foundUser = await User.findById(id);
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      return response.status(403).send({
        message: "Извините, но текущий пароль не подходит!",
      });
    }
    const user = await User.findOneAndUpdate({ _id: id }, data, { new: true });
    return response.status(200).send(user);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

module.exports = {
  ...genericCrud(User),
  get,
  uploadImg,
  updateProfile,
  updateAccount,
};
