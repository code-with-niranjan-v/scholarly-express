import express from "express";

import UserController from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/login", (req, res) => {
  UserController.login(req, res);
});

userRouter.post("/signup", (req, res) => {
  UserController.registerUser(req, res);
});

userRouter.get("/allstudent", (req, res) => {
  UserController.getAllStudents(req, res);
});

export default userRouter;
