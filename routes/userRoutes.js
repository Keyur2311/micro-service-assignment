const express = require('express')
const { addUser, fetchUsers, deleteUser } = require('../controllers/userController.js')

const router = express.router()

router.post('/users', addUser)
router.get('/users', fetchUsers)
router.delete('users/:userId', deleteUser)

module.exports = router
