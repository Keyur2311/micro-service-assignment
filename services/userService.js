const User = require('../models/userModel')

const addUser = async (userData) => {
    return User.create(userData)
}

const getAllUsers = async (filter = {}) => {
    return User.findAll({ where: filter })
}

const deleteUser = async (userId) => {
    const user = await User.findByPk(userId)
    if (user) {
        await user.destroy();
        return true
    }

    return false;
}

module.exports = { addUser, getAllUsers, deleteUser }