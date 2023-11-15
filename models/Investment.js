const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require("mongoose");

const shemInvestment = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
  },
  projectId: {
    type: ObjectId,
    ref: "Project",
  },
  amount: Number,
});

module.exports = model("Investment", shemInvestment);
