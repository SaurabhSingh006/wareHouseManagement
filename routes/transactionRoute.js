const express = require("express");
const transactionController = require("./../controllers/transactionController");
const protect = require("./../middleware/tokenValidation");

const router = express.Router();

router.get('/', transactionController.retrieveAllTransaction);

// To protect routes
router.use(protect);
router.get('/user', transactionController.retrieveMyTransaction);
router.post('/send', transactionController.sendMoney);

module.exports = router;