const dotenv = require('dotenv');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
dotenv.config();

const getAll = (req, res) => {
  console.log('success');
  res.send('test');
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during signup' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userDoc = await User.findOne({ email }).exec();
  
    if (!userDoc) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const passOK = bcrypt.compareSync(password, userDoc.password);
  
    if (!passOK) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  
    const token = jwt.sign({ email: userDoc.email, id: userDoc._id }, process.env.JWT_SECRET);
  
    res.cookie('token', token).json(userDoc);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
};


module.exports = {
  getAll,
  login,
  signup,
  
};
