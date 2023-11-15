require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Token } = require("../models");

module.exports = {
  async logout({ body: { _id } }, response) {
    // ????
    const foundToken = await Token.findOne({ user: _id });

    if (!foundToken) {
      return response.status(403).send({
        message: "Пользователь не авторизован",
      });
    }

    await Token.findByIdAndDelete(foundToken._id);

    return response.status(200).send({
      message: "Юзер успешно разлогинен",
    });
  },
  async refreshToken({ body: { refreshToken } }, response) {
    // Проверяем есть ли токен в запросе на сервер
    if (!refreshToken) {
      return response.status(403).send({
        message: "Действие запрещено",
      });
    }
    // ищем токен в бд
    const currentToken = await Token.findOne({ token: refreshToken });

    // если не находим токен то возвращаем ошибку
    if (!currentToken) {
      return response.status(403).send({
        message: "Действие запрещено",
      });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (error, user) => {
      if (error) {
        return response.status(403).send({
          message: "Действие запрещено",
        });
      }

      const accessToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return response.status(200).send({
        accessToken,
        user: user,
      });
    });
  },
  async login({ body: { email, password } }, response) {
    try {
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        return response.status(403).send({
          message: "Извините, но логин или пароль не подходят!",
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!isPasswordCorrect) {
        return response.status(403).send({
          message: "Извините, но логин или пароль не подходят!",
        });
      }

      foundUser.password = null; // ?????

      const accessToken = jwt.sign(
        {
          userId: foundUser._id,
          email: foundUser.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const refreshToken = jwt.sign(
        {
          userId: foundUser._id,
          email: foundUser.email,
        },
        process.env.JWT_SECRET_REFRESH,
        {
          expiresIn: "30d",
        }
      );

      const foundToken = await Token.findOne({
        user: foundUser._id,
      });

      if (foundToken) {
        await Token.findByIdAndUpdate(foundToken._id, { token: refreshToken });
        return response.status(200).send({
          accessToken,
          refreshToken,
          user: foundUser,
        });
      }

      const token = new Token({ token: refreshToken, user: foundUser._id });
      await token.save();

      return response.status(200).send({
        accessToken,
        refreshToken,
        user: foundUser,
      });
    } catch (error) {
      return response.status(403).send({
        message: "Извините, но логин или пароль не подходят!",
        error,
      });
    }
  },
  async signup({ body: { name, email, password } }, response) {
    try {
      const foundUser = await User.findOne({ email });

      if (foundUser) {
        return response.status(403).send({
          message: "Данный email занят",
        });
      }

      const createdUser = await new User({ name, email, password });
      await createdUser.save();

      return response.status(200).send({
        message: "Пользователь создан",
      });
    } catch (error) {
      return response.status(403).send({
        message: "Извините, но логин или пароль не подходят!",
        error,
      });
    }
  },
};
