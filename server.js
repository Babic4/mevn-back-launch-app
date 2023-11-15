require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
// const multer = require("multer"); // test
const { routes } = require("./routes");

// multer (TEST)
// const storageConfig = multer.diskStorage({
//   destination: (request, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (request, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// Инициализация приложения
const app = express();

app.use(cors());
app.use("/public", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT ?? 3000;

async function start() {
  try {
    // Подключение к БД
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // Объявление route
    routes.forEach((item) => {
      app.use(`/api/${item}`, require(`./routes/${item}`));
    });

    app.listen(PORT, () => {
      console.log(`[OK] Server is running on localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
