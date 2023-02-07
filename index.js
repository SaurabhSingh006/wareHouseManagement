const express = require("express");
const res = require("express/lib/response");

const app = express();

app.get('', () => {
    res.status(200).json({
        status: true,
        message: "Server is live"
    })
});