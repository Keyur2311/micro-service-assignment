const userController = require('../controllers/userController');
const userService = require('../services/userService');
const validationService = require('../services/validationService');

// Mock the services
jest.mock('../services/userService');
jest.mock('../services/validationService');

describe('userController', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, query: {}, params: {} }; // Mock request object
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }; // Mock response object
    });

    describe('addUser', () => {
        it('should add a user and return 201 status with user data', async () => {
            const mockUser = { id: 1, name: 'John Doe' };
            req.body = { name: 'John Doe', email: 'john@example.com' };

            validationService.validateUserInput.mockResolvedValue();
            userService.addUser.mockResolvedValue(mockUser);

            await userController.addUser(req, res);

            expect(validationService.validateUserInput).toHaveBeenCalledWith(req.body);
            expect(userService.addUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 400 status with error message if validation fails', async () => {
            const error = new Error('Invalid input');
            validationService.validateUserInput.mockRejectedValue(error);

            await userController.addUser(req, res);

            expect(validationService.validateUserInput).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });
    });

    describe('fetchUsers', () => {
        it('should fetch users with a filter and return 200 status', async () => {
            const mockUsers = [{ id: 1, name: 'John Doe' }];
            req.query = { role: 'admin' };
            userService.fetchUsers.mockResolvedValue(mockUsers);

            await userController.fetchUsers(req, res);

            expect(userService.fetchUsers).toHaveBeenCalledWith({ role: 'admin' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should fetch all users and return 200 status when no filter is provided', async () => {
            const mockUsers = [{ id: 1, name: 'John Doe' }];
            userService.fetchUsers.mockResolvedValue(mockUsers);

            await userController.fetchUsers(req, res);

            expect(userService.fetchUsers).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should return 500 status with error message if fetching users fails', async () => {
            const error = new Error('Database error');
            userService.fetchUsers.mockRejectedValue(error);

            await userController.fetchUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });
    });

    describe('deleteUser', () => {
        it('should delete a user and return 200 status with success message', async () => {
            req.params = { userId: '1' };
            userService.deleteUser.mockResolvedValue(true);

            await userController.deleteUser(req, res);

            expect(userService.deleteUser).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
        });

        it('should return 404 status if user is not found', async () => {
            req.params = { userId: '1' };
            userService.deleteUser.mockResolvedValue(false);

            await userController.deleteUser(req, res);

            expect(userService.deleteUser).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });

        it('should return 500 status with error message if deletion fails', async () => {
            const error = new Error('Database error');
            req.params = { userId: '1' };
            userService.deleteUser.mockRejectedValue(error);

            await userController.deleteUser(req, res);

            expect(userService.deleteUser).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });
    });
});
