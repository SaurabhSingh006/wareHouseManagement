const { Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize("postgres://warehousemanagement_user:7cPuhvAxoajue4XjUxxylDN8tqeK29ha@dpg-cfh8cuo2i3mp5rvm27pg-a.oregon-postgres.render.com/warehousemanagement?ssl=true", {
    operatorsAliases: {
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $in: Op.in,
        $like: Op.like,
        $ne: Op.ne,
        $ilike: Op.iLike,
        $and: Op.and,
        $or: Op.or
    }
})

module.exports ={
    sequelize
}