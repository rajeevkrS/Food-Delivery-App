import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

// create user using user's data- name, email and password
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
