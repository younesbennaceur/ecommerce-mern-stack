import User from '../models/user.model.js';


export const signup = async (req, res) => {
 const { email, password, name } = req.body;
 try {
    const UserExist = await User.findOne({ email });
    if (UserExist){
        return res.status(400).json({ message: "User already exists"});
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User created successfully", user });
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
  
 
 
 
}
export const login = (req, res) => {
  res.send('login controller');
}
export const logout = (req, res) => {
  res.send('logout controller');
}