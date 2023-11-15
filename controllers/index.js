const user = require("./user.controller");
const project = require("./project.controller");
const category = require("./category.controller");
const comment = require("./comment.controller");
const investment = require("./investment.controller");
const favorit = require("./favorit.controller");
const authorization = require("./authorization.controller");
const payment = require("./payment.controller");
const admin = require("./admin.controller");

module.exports = {
  user,
  project,
  category,
  comment,
  investment,
  favorit,
  authorization,
  payment,
  admin,
};
