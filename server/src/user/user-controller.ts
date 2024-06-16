import User from "../auth/models/User";

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