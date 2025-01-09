const userService = require('../services/userService')
const validationService = require('../services/validationService')

async function addUser(req, res) {
    try {
        await validationService.validateUserInput(req.body);
        const user = await userService.addUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function fetchUsers(req, res) {
    try {
        console.log("abccc")
        const filter = req.query.role ? { role: req.query.role } : {};
        const users = await userService.fetchUsers(filter);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteUser(req, res) {
    try {
        const success = await userService.deleteUser(req.params.userId);
        if (!success) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { addUser, fetchUsers, deleteUser };