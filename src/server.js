const express = require("express");
const connect = require("./config/db");
const userController = require("./controllers/user.controller");
const profileController = require("./controllers/profile.controller");

const app = express();
app.use(express.json());

app.use("/users", userController);
app.use("/users/profile", profileController);

const start = async () => {
  await connect();

  app.listen(process.env.PORT || 3300, () => {
    console.log(`Port is listening on 3300`);
  });
};

start();
