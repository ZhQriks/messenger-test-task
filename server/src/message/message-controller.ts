import Message from "./models/Message";

class MessageControllers{
    getMessages = async (req, res) => {
        try {
          const messages = await Message.find({ roomId: req.params.roomId }).sort({ createdAt: 1 });
          res.json(messages);
        } catch (error:any) {
          res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
      };
}

export default MessageControllers;