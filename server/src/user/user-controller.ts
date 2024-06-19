import AuthService from "../auth/auth-service";
import authService from "../auth/auth-service";
import User from "../auth/models/User";
import Message from "../message/models/Message";

class UserController{


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
      
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); 
      }
  
      res.status(200).json(user);  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });  
    }
  };

  getDirectMessages = async (req, res) => {
    const cursor = req.query.cursor || 0; // Use a cursor or page parameter for pagination
    const limit = 10; // Adjust limit as necessary
    const email = req.query.email; // Optional email query parameter
  
    try {
      const senderId = req.user.id;
      let usersQuery: any = { _id: { $ne: senderId } };
  
      if (email) {
        usersQuery.email = { $regex: email, $options: 'i' };
      }
  
      const users = await User.find(usersQuery)
        .skip(cursor * limit)
        .limit(limit);

  
      const usersWithLastMessage = await Promise.all(users.map(async (user) => {
        const receiverIdString = (user as any)._id.toString();
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: senderId, receiverId: receiverIdString },
            { senderId: receiverIdString, receiverId: senderId }
          ]
        }).sort({ createdAt: -1 }).limit(1).exec();
  
        return {
          user,
          lastMessage
        };
      }));
  
      const nextCursor = users.length === limit ? cursor + 1 : null;
  
      res.status(200).json({ data: usersWithLastMessage, nextCursor });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching direct messages', error });
    }
  };  
  
}

export default UserController;