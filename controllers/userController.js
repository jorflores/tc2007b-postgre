const User = require('../models/User');
const bcrypt = require('bcrypt');
const API_KEY = process.env.API_KEY || ""
const jwt = require("jsonwebtoken");



exports.createUser = async (req, res) => {
  try {
    console.log(req.headers)

    const apiKey = req.headers["authorization"];

    if (apiKey !== API_KEY){
      return res.status(403).json({error: "Acceso denegado"})
    }

    const { phone, password } = req.body;
    const newUser = await User.create({ phone, password });
    // Sequelize maneja automáticamente el hashing en el modelo, si configuraste un hook
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ where: { phone: phone } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.loginUserToken = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ where: { phone: phone } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({id: user.uid, phone: user.phone, role: user.role}, "SECRETKEY", {expiresIn: "1h"})    

    res.json({ message: 'Login successful', token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllUsers = async(req,res) => {


  try {
    const user = await User.findAll()

    res.json({user});

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  

}