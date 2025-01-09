const { addUser, fetchUsers, deleteUser } = require('../services/userService');
const User = require('../models/userModel');

// Mock Sequelize methods
jest.mock('../models/userModel', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn()
}));

describe('userService', () => {

    describe('addUser', () => {
        it('should add a user and return the created user', async () => {
            const userData = { name: 'John Doe', email: 'john@example.com' };
            const createdUser = { id: 1, ...userData };

            User.create.mockResolvedValue(createdUser);

            const result = await addUser(userData);

            expect(User.create).toHaveBeenCalledWith(userData);
            expect(result).toEqual(createdUser);
        });
    });

    describe('fetchUsers', () => {
        it('should fetch all users when no filter is provided', async () => {
            const allUsers = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
            ];

            User.findAll.mockResolvedValue(allUsers);

            const result = await fetchUsers();

            expect(User.findAll).toHaveBeenCalledWith({ where: {} });
            expect(result).toEqual(allUsers);
        });

        it('should fetch users based on a filter', async () => {
            const filter = { name: 'John Doe' };
            const filteredUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

            User.findAll.mockResolvedValue(filteredUsers);

            const result = await fetchUsers(filter);

            expect(User.findAll).toHaveBeenCalledWith({ where: filter });
            expect(result).toEqual(filteredUsers);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user when user exists', async () => {
            const userId = 1;
            const user = { id: userId, destroy: jest.fn() };

            User.findByPk.mockResolvedValue(user);

            const result = await deleteUser(userId);

            expect(User.findByPk).toHaveBeenCalledWith(userId);
            expect(user.destroy).toHaveBeenCalled();
            expect(result).toBe(true);
        });

        it('should return false when user does not exist', async () => {
            const userId = 1;

            User.findByPk.mockResolvedValue(null);

            const result = await deleteUser(userId);

            expect(User.findByPk).toHaveBeenCalledWith(userId);
            expect(result).toBe(false);
        });
    });
});
