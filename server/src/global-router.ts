import { Router } from "express";
import authRouter from "./auth/auth-router";
import UserController from "./user/user-controller";
import { authMiddleware } from "./middlewares/auth-middleware";

const globalRouter = Router();
const userController = new UserController();

globalRouter.use(authRouter);
globalRouter.get('/users', authMiddleware,  userController.getDirectMessages);
globalRouter.get('/users/:userId', userController.getUserById);
// globalRouter.get('/users/direct', userController.getDirectMessages);

// other routers can be added here

export default globalRouter;
