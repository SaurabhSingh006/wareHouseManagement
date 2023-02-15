const { sequelize } = require("../sequelize");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

exports.sendMoney = catchAsync(async (req, res, next) => {
    if(req.body.ammount > req.user.balance) return next(new AppError("Insufficient balance", 400));
    if(req.user.user_UID == req.body.receiver_user_UID) return next(new AppError("Self payment is not allowed", 400));

    // Make transaction
    req.body.user_UID = req.user.user_UID;
    const result = await sequelize.transaction(async (t) => {
        const transactionBody = [
            { user_UID: req.user.user_UID, amount: req.body.amount, type: "DEBITED", message: req.body.message },
            { user_UID: req.body.receiver_user_UID, amount: req.body.amount, type: "CREDITED", message: req.body.message }
        ];
        await sequelize.models.Transaction.bulkCreate(transactionBody, { transaction: t });

        await sequelize.models.User.update({ balance: req.user.balance - req.body.amount },{
            where: { user_UID: req.user.user_UID }
        }, { transaction: t });

        const receiver = await sequelize.models.User.findOne({ where: { 
            user_UID: req.body.receiver_user_UID
        }, attributes: ["balance", "user_UID"] });
        console.log(receiver);
        await sequelize.models.User.update({ balance: receiver.balance + req.body.amount },{
            where: { user_UID: receiver.user_UID }
        }, { transaction: t });

        return true;
    });

    // Send response
    res.status(201).json({
        status: true,
        message: "Transaction made successfully"
    });
});

exports.retrieveMyTransaction = catchAsync(async (req, res, next) => {
    req.query.user_UID = req.user.user_UID;
    const transaction = await new APIFeatures(sequelize.models.Transaction, req).addFeatures();

    // Send response
    res.status(201).json({
        status: true,
        message: "Transaction retrieve successfully",
        transaction
    });
});

exports.retrieveAllTransaction = catchAsync(async (req, res, next) => {
    const transaction = await new APIFeatures(sequelize.models.Transaction, req).addFeatures();

    // Send response
    res.status(201).json({
        status: true,
        message: "Transaction retrieve successfully",
        transaction
    });
});