const dotenv = require("dotenv");
const { Sequelize, Op } = require("sequelize");
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3001;
const app = require('./app');

// POSTGRES DATABASE CONNECTION
// const sequelize = new Sequelize(
//     process.env.DATABASE,
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {
//         host: process.env.DATABASE_HOSTNAME,
//         dialect: 'postgres',
//         ssl: true,
//         dialectOptions: {
//             useUTC: false, //for reading from database
//         }, 
//         timezone: "+05:30", // for writng
//         operatorsAliases: {
//             $gt: Op.gt,
//             $gte: Op.gte,
//             $lt: Op.lt,
//             $lte: Op.lte,
//             $in: Op.in,
//             $like: Op.like,
//             $ne: Op.ne,
//             $ilike: Op.iLike,
//             $and: Op.and,
//             $or: Op.or
//         }
//     }
// ); 

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

sequelize.authenticate().then(() => console.log("Database connection successfully"))

// START THE SERVER
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});