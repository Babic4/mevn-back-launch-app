const { Schema, model } = require("mongoose");

const shemCategory = new Schema({
  category: String,
  nameCategory: String,
});

module.exports = model("Category", shemCategory);
