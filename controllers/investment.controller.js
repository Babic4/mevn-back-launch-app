const boom = require("boom");
const Investment = require("../models/Investment");
const genericCrud = require("./generic.controller");

//create
const getInvestment = async ({ params: { projectId, userId } }, response) => {
  try {
    const foundInvetment = await Investment.findOne({
      projectId: projectId,
      userId: userId,
    });
    if (!foundInvetment) {
      return response.status(403).send({
        message: "Пользователь не инвестировал",
      });
    }
    return response.status(200).send(foundInvetment);
  } catch (error) {
    console.log(error);
    return response.status(400).send(boom.boomify(error));
  }
};

const getInvestmentsProject = async ({ params: { projectId } }, response) => {
  try {
    const foundInvetments = await Investment.find({
      projectId: projectId,
    }).populate("userId", "_id name image");
    return response.status(200).send(foundInvetments);
  } catch (error) {
    console.log(error);
    return response.status(400).send(boom.boomify(error));
  }
};

const getInvestmentUser = async ({ params: { userId } }, response) => {
  try {
    const foundInvetments = await Investment.find({ userId: userId }).populate(
      "projectId",
      "_id title description image"
    );
    return response.status(200).send(foundInvetments);
  } catch (error) {
    console.log(boom.boomify(error));
    return response.status(400).send(boom.boomify(error));
  }
};

module.exports = {
  ...genericCrud(Investment),
  getInvestment,
  getInvestmentsProject,
  getInvestmentUser,
};
