const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require("mongoose");

const schemaToken = new Schema({
  token: {
    type: String,
    default: "",
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = model("Token", schemaToken);
