import express from 'express';
import MessageControllers from './message-controller';

const messageRouter = express.Router();
const messageController = new MessageControllers();

messageRouter.get('/:receiverId', messageController.getMessages);

export default messageRouter;