const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userControllers');
const { authenticateToken } = require('../middleware/authMiddleware'); // Import authentication middleware

router.post('/register', register);
router.post('/login', login);

module.exports = router;