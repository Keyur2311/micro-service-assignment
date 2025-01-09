// Import service functions and User model
const { addUser, fetchUsers, deleteUser } = require('../services/userService');
const User = require('../models/userModel');

// Mock Sequelize methods for unit testing purposes
jest.mock('../models/userModel', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn()
}));

// Main test suite for userService functions
describe('userService', () => {

    // Test suite for addUser function
    describe('addUser', () => {
        it('should add a user and return the created user', async () => {
            const userData = { name: 'John Doe', email: 'john@example.com' };
            const createdUser = { id: 1, ...userData };

            // Mock the resolved value of User.create
            User.create.mockResolvedValue(createdUser);

            const result = await addUser(userData);

            // Ensure that User.create was called with the correct arguments
            expect(User.create).toHaveBeenCalledWith(userData);
            expect(result).toEqual(createdUser);
        });
    });

    // Test suite for fetchUsers function
    describe('fetchUsers', () => {
        it('should fetch all users when no filter is provided', async () => {
            const allUsers = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
            ];

            // Mock the resolved value of User.findAll
            User.findAll.mockResolvedValue(allUsers);

            const result = await fetchUsers();

            // Ensure that User.findAll was called without a filter
            expect(User.findAll).toHaveBeenCalledWith({ where: {} });
            expect(result).toEqual(allUsers);
        });

        it('should fetch users based on a filter', async () => {
            const filter = { name: 'John Doe' };
            const filteredUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

            // Mock the resolved value of User.findAll with a filter
            User.findAll.mockResolvedValue(filteredUsers);

            const result = await fetchUsers(filter);

            // Ensure that User.findAll was called with the correct filter
            expect(User.findAll).toHaveBeenCalledWith({ where: filter });
            expect(result).toEqual(filteredUsers);
        });
    });

    // Test suite for deleteUser function
    describe('deleteUser', () => {
        it('should delete a user when user exists', async () => {
            const userId = 1;
            const user = { id: userId, destroy: jest.fn() };

            // Mock the resolved value of User.findByPk to return a user
            User.findByPk.mockResolvedValue(user);

            const result = await deleteUser(userId);

            // Ensure that User.findByPk was called with the correct userId
            expect(User.findByPk).toHaveBeenCalledWith(userId);
            expect(user.destroy).toHaveBeenCalled();  // Ensure destroy method was called
            expect(result).toBe(true);
        });

        it('should return false when user does not exist', async () => {
            const userId = 1;

            // Mock the resolved value of User.findByPk to return null (no user found)
            User.findByPk.mockResolvedValue(null);

            const result = await deleteUser(userId);

            // Ensure that User.findByPk was called and returned false as expected
            expect(User.findByPk).toHaveBeenCalledWith(userId);
            expect(result).toBe(false);
        });
    });
});
