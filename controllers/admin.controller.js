const boom = require("boom");
const { Project } = require("../models");

const getNewProjects = async (_, response) => {
  try {
    const findProjects = await Project.find({
      checkPublish: true,
    })
      .populate("ownerId", "_id name")
      .populate("category", "nameCategory");
    return response.status(200).send(findProjects);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

module.exports = {
  getNewProjects,
};
