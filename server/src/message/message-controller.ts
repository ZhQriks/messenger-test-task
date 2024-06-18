import Message from "./models/Message";

class MessageControllers{
    getMessages = async (req, res) => {
        try {
          const messages = await Message.find({ receiverId: req.params.receiverId }).sort({ createdAt: 1 });
          res.json(messages);
        } catch (error:any) {
          res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
      };
    
      markMessageAsRead = async (req, res) => {
        try {
          const { messageId } = req.params;
          
          const message = await Message.findByIdAndUpdate(
            messageId,
            { read: true },
            { new: true } 
          );
    
          if (!message) {
            return res.status(404).json({ error: 'Message not found' });
          }
    
          res.json({ message: 'Message marked as read', data: message });
        } catch (error : any) {
          res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
      };
}

export default MessageControllers;