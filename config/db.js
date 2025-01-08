const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("database connected")
    } catch (err) {
        console.log("there is some error", err);
    }
}

module.exports = { sequelize, connectDB }