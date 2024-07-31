const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const userRouters = require('./routers/userRouters');
const defaultSweetRouter = require('./routers/defaultSweetRouter');
const mainSweetRouter = require('./routers/mainSweetRouter');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const { authenticateToken } = require('./middleware/authMiddleware');

// Router Paths
app.use('/api/users', userRouters);
app.use('/api/sweets', defaultSweetRouter);
app.use('/api/mainsweet', mainSweetRouter);

// Database Connection
connectDB();

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



// Protected Route (Example)
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});




// Basic route for health check
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Server Running Port Number
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
