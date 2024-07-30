const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const userRouters = require('./routers/userRouters');
const defaultSweetRouter = require('./routers/defaultSweetRouter');
const mainSweetRouter = require('./routers/mainSweetRouter');
require('dotenv').config(); // Add this line to load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Server Running Port Number
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
