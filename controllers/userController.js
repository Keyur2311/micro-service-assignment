const userService = require('../services/userService')
const validationService = require('../services/validationService')

/**
 * Adds a new user to the system after validating the input.
 * Sends a success response with the created user or an error response if validation fails.
 * 
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object for sending the response.
 */
async function addUser(req, res) {
    try {
        await validationService.validateUserInput(req.body);
        const user = await userService.addUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


/**
 * Fetches a list of users from the system.
 * Supports optional filtering by role using query parameters.
 * Sends the user list or an error response if fetching fails.
 * 
 * @param {Object} req - Express request object containing optional query parameters.
 * @param {Object} res - Express response object for sending the response.
 */
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

/**
 * Deletes a user by their ID.
 * Sends a success response if the user is deleted or a not found error if the user does not exist.
 * 
 * @param {Object} req - Express request object containing the user ID as a route parameter.
 * @param {Object} res - Express response object for sending the response.
 */
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