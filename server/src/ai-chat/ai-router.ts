import express from 'express';
import AiController from './ai-controller';

const aiRouter = express.Router();
const aiController = new AiController();

aiRouter.get('/streamChatCompletion', aiController.chatCompletion);

export default aiRouter;