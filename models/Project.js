const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require("mongoose");

const shemProject = new Schema({
  title: String,
  description: String,
  ownerId: {
    type: ObjectId,
    ref: "User",
  },
  category: {
    type: ObjectId,
    ref: "Category",
  },
  location: String,
  image: String,
  video: String,
  collectingAmount: Number,
  radioButton: Number,
  numberOfDays: Number,
  targetDate: String,
  created: {
    type: Date,
    default: Date.now,
  },
  story: String,
  risks: String,
  checkPublish: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  publishDate: {
    type: Date,
    default: null,
  },
  checkingAccount: String,
  BIC: String,
  PAN: String,
  notification: {
    type: Object,
    default: null,
  },
});

module.exports = model("Project", shemProject);
