const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const { handleFormData } = require("../helpers/formFormidable");

userRouter.get("/", (req, res) => {
  res.send("Wel-Come User Route");
});

userRouter.post("/add", userController.addUser);
userRouter.post("/upload-file", handleFormData, userController.uploadFile);

module.exports = userRouter;
