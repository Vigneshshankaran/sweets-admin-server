const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  await body('username').notEmpty().run(req);
  await body('email').isEmail().notEmpty().run(req);
  await body('password').notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log(`User registered successfully: ${username}`);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  await body('username').notEmpty().run(req);
  await body('password').notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const payload = {
      userId: existingUser._id,
      username: existingUser.username
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    console.log(`User logged in successfully: ${username}`);
    return res.status(200).json({ result: existingUser, token, message: 'Login successful' });
  } catch (error) {
    console.error(`Error logging in user: ${error.message}`);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};