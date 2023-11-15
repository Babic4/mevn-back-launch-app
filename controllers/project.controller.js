const boom = require("boom");
const { Project, Category } = require("../models");
const genericCrud = require("./generic.controller");
const multer = require("multer");

// create, update, find, filter

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

const get = async ({ params: { id } }, response) => {
  try {
    const project = await Project.findById(id).populate("ownerId", "_id name");
    return response.status(200).send(project);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

const getPublishedProjects = async (_, response) => {
  try {
    const findProjects = await Project.find({
      published: true,
      publishDate: { $ne: null },
    })
      .populate("ownerId", "_id name")
      .populate("category", "nameCategory");
    return response.status(200).send(findProjects);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

const getDraftProjects = async ({ params: { userId } }, response) => {
  try {
    const findProjects = await Project.find({
      ownerId: userId,
      published: false,
    })
      .populate("ownerId", "_id name")
      .populate("category", "nameCategory");
    return response.status(200).send(findProjects);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

const getProjectUs = async ({ params: { userId } }, response) => {
  try {
    const findProjects = await Project.find({
      ownerId: userId,
      publishDate: { $ne: null },
    }).populate("ownerId", "_id name");
    return response.status(200).send(findProjects);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

const create = async ({ body }, response) => {
  try {
    const category = await Category.findOne({ nameCategory: body.category });
    body.category = category._id;
    const project = new Project(body);
    const newpProject = await project.save();
    return response.status(200).send(newpProject);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

const update = async ({ params: { id }, body, file }, response) => {
  try {
    if (file) {
      body.image = file.path;
    }
    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
    }).populate("ownerId", "_id name");
    return response.status(200).send(project);
  } catch (error) {
    console.log(error);
    return response.status(400).send(boom.boomify(error));
  }
};

const filterCategory = async ({ params: { category } }, response) => {
  try {
    const foundCategory = await Category.findOne({
      category: category,
    });
    const projects = await Project.find({
      category: foundCategory._id,
      published: true,
      publishDate: { $ne: null },
    }).populate("ownerId", "_id name");
    return response.status(200).send(projects);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

checkNotification = async ({ params: { userId } }, response) => {
  try {
    const projects = await Project.find({
      ownerId: userId,
      notification: { $ne: null },
    });
    return response.status(200).send(projects);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

removeNotification = async (_, response) => {
  try {
    const projectsUpdate = await Project.updateMany(
      { notification: { $ne: null } },
      { notification: null }
    );
    return response.status(200).send(projectsUpdate);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

module.exports = {
  ...genericCrud(Project),
  uploadImg,
  get,
  getProjectUs,
  getPublishedProjects,
  getDraftProjects,
  create,
  update,
  filterCategory,
  checkNotification,
  removeNotification,
};
