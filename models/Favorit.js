const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require("mongoose");

const shemFavorit = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
  },
  projectId: {
    type: ObjectId,
    ref: "Project",
  },
});

module.exports = model("Favorit", shemFavorit);
