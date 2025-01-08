const DataTypes = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Editor', 'Viewer'),
        allowNull: false,
    },
})