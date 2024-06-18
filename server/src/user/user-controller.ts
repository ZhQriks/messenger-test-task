import User from "../auth/models/User";
import Message from "../message/models/Message";

class UserController{
  
  getDirectMessages = async (req, res) => {
    try {
      const userId = req.params.userId;

      const lastMessage = await Message.findOne({ senderId: userId })
                                       .sort({ createdAt: -1 });

      const unreadMessagesCount = await Message.countDocuments({ receiverId: userId, read: false });

      const directMessages = await Message.find({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }).sort({ createdAt: 1 });

      res.status(200).json({
        lastMessage,
        unreadMessagesCount,
        directMessages
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching direct messages', error });
    }
  };
  getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };
  
  getUserById = async (req, res) => {
    try {
      const userId = req.params.userId; 
      console.log(userId);
      
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); 
      }
  
      res.status(200).json(user);  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });  
    }
  };
}

export default UserController;