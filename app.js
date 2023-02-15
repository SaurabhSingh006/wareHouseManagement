const express = require("express");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/transaction', transactionRoutes);

app.get('/heartbeats', (req, res) => {

    res.status(200).json({
        status: true,
        message: "Server is live",
    })
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app; 