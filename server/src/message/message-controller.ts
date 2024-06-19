import mongoose from "mongoose";
import Message from "./models/Message";
import User from "../auth/models/User";


class MessageControllers{
    getMessages = async (req, res) => {
        try {
          const userId = req.params.userId; 

          const user = await User.findById(userId);

          if (!user) {
            return res.status(404).json({ message: 'User not found' }); 
          }

          const messages = await Message.find({ receiverId: user.id }).sort({ createdAt: 1 });
          res.json(messages);
        } catch (error:any) {
          res.status(500).json({ error: 'Internal Server Error', detail: error.message });
          console.log('error happens', error);
        }
      };
}

export default MessageControllers;