require("dotenv").config();
const { verify } = require("jsonwebtoken");

const checkJWTSign = (request, response, next) => {
  const {
    headers: { authorization },
  } = request;

  const token = authorization && authorization.split(" ")[1];

  if (token == null) return response.sendStatus(401);

  verify(token, process.env.JWT_SECRET, (error) => {
    if (error) {
      return response.sendStatus(403);
    }
    next();
  });
};

module.exports = { checkJWTSign };
