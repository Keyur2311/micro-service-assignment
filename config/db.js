const Sequelize = require('sequelize')
require('dotenv').config()

// Initialize Sequelize with MySQL configuration from environment variables
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
});


// Function to authenticate and connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("database connected")
    } catch (err) {
        console.log("there is some error", err);
    }
}

module.exports = { sequelize, connectDB }