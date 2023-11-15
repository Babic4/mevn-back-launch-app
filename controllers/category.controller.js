const Category = require("../models/Category");
const genericCrud = require("./generic.controller");

//create, update, delete,

module.exports = { ...genericCrud(Category) };
