const express = require('express');
const {register, login, authenticateToken} = require('../controllers/userControllers');

const router = express.Router();

//register Route

router.post('/register', register);
router.post('/login', login);

router.get('/api/users/verify', authenticateToken, (req, res) => {
  // Return the user data
  res.json({ user: req.user });
});

module.exports = router;