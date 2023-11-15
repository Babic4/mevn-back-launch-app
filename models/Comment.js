const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require("mongoose");

const shemComment = new Schema({
  parentId: {
    type: ObjectId,
    ref: "Comment",
    default: null,
  },
  projectId: {
    type: ObjectId,
    ref: "Project",
  },
  authorId: {
    type: ObjectId,
    ref: "User",
  },
  message: String,
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Comment", shemComment);
