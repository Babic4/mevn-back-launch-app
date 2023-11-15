const boom = require("boom");
const Favorit = require("../models/Favorit");
const genericCrud = require("./generic.controller");

const getFavoritUsPr = async ({ params: { userId, projectId } }, response) => {
  try {
    const favorit = await Favorit.findOne({
      userId: userId,
      projectId: projectId,
    });

    if (!favorit) {
      return response.status(403).send({
        message: "Отсутсвует в избранном",
      });
    }

    return response.status(200).send(favorit);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

const getFavoritsUs = async ({ params: { userId } }, response) => {
  try {
    const favorits = await Favorit.find({
      userId: userId,
    })
      .populate("projectId", "_id title description image")
      .populate("userId", "_id name");

    if (!favorits) {
      return response.status(403).send({
        message: "Отсутсвуют избранные проекты",
      });
    }

    return response.status(200).send(favorits);
  } catch (error) {
    return response.status(400).send(boom.boomify(error));
  }
};

module.exports = { ...genericCrud(Favorit), getFavoritUsPr, getFavoritsUs };
