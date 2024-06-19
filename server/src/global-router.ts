import { Router } from "express";
import authRouter from "./auth/auth-router";
import UserController from "./user/user-controller";
import { authMiddleware } from "./middlewares/auth-middleware";
import aiRouter from "./ai-chat/ai-router";

const globalRouter = Router();
const userController = new UserController();

globalRouter.use(authRouter);
globalRouter.use(aiRouter);
globalRouter.get('/users', authMiddleware,  userController.getDirectMessages);
globalRouter.get('/users/:userId', userController.getUserById);

// other routers can be added here

export default globalRouter;
