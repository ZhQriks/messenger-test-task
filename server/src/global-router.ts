import { Router } from "express";
import authRouter from "./auth/auth-router";
import UserController from "./user/user-controller";

const globalRouter = Router();
const userController = new UserController();

globalRouter.use(authRouter);
globalRouter.get('/users', userController.getAllUsers);
globalRouter.get('/users/:userId', userController.getUserById);

// other routers can be added here

export default globalRouter;
