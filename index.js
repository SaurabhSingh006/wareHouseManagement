const express = require("express");
const res = require("express/lib/response");

const app = express();

app.get('', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Server is live"
    })
});

app.listen(5000, () => {
    console.log("Server is listening at port 5000");
})