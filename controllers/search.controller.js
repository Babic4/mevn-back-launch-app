const { Project, User } = require("../models");

const searchProjects = async ({ params: { text } }, response) => {
  try {
    const projects = await Project.find({
      title: { $regex: `${text}`, $options: "i" },
    }).populate("category", "nameCategory");
    return response.status(200).send(projects);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

const searchUsers = async ({ params: { text } }, response) => {
  try {
    const users = await User.find({
      name: { $regex: `^${text}`, $options: "i" },
    });
    return response.status(200).send(users);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

module.exports = { searchProjects, searchUsers };
