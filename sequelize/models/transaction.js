const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./../index");

class transaction extends Model {}
transaction.init({
    transaction_UID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000
    }
},{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Transaction', // We need to choose the model name
    tableName: 'transactions',
    paranoid: true,
})