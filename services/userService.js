const User = require('../models/userModel')

const addUser = async (userData) => {
    const user = await User.create(userData);
    console.log(user);
    return user;
}

const fetchUsers = async (filter = {}) => {
    const allusers = await User.findAll();
    console.log(allusers)
    console.log("abccc")
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

module.exports = { addUser, fetchUsers, deleteUser }