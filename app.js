const express = require("express");
const authRoutes = require("./routes/authRoutes");
const authController = require("./controllers/authController");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/v1/auth', authRoutes);

app.get('/heartbeats', (req, res) => {
    const token = authController.signToken(req.query.id);

    res.status(200).json({
        status: true,
        message: "Server is live",
        token
    })
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;