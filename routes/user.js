const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.get("/", (req, res) => {
  res.send("Wel-Come User Route");
});

userRouter.post("/add", userController.addUser);

module.exports = userRouter;
