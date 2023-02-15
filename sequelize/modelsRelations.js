const { sequelize } = require("./index");

const modelsRelationshipSetup = async () => {
    // await sequelize.models.User.belongsToMany(sequelize.models.User, { through: sequelize.models.Transaction, foreignKey: 'receiver_user_UID', as: 'debited' });
    // await sequelize.models.User.belongsToMany(sequelize.models.User, { through: sequelize.models.Transaction, foreignKey: 'user_UID', as: 'credited' });

    await sequelize.models.User.hasMany(sequelize.models.Transaction, { foreignKey: 'user_UID' });
    await sequelize.models.Transaction.belongsTo(sequelize.models.User, { foreignKey: 'user_UID' });

};

module.exports = { 
    modelsRelationshipSetup
}