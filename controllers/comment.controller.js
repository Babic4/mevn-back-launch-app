const boom = require("boom");
const Comment = require("../models/Comment");
const genericCrud = require("./generic.controller");

//create
const getCommentsPr = async ({ params: { projectId } }, response) => {
  try {
    const foundComments = await Comment.find({ projectId: projectId })
      .populate("authorId", "name image")
      .populate("projectId", "ownerId");
    return response.status(200).send(foundComments);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

module.exports = { ...genericCrud(Comment), getCommentsPr };
