const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const userController = require('../controllers/userController');

// Mock the controller methods
jest.mock('../controllers/userController', () => ({
    addUser: jest.fn(),
    fetchUsers: jest.fn(),
    deleteUser: jest.fn()
}));

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use('/api', userRoutes); // Mount the routes under /api


// Test suite for userRoutes
describe('userRoutes', () => {

    // Test case for POST /api/users
    describe('POST /api/users', () => {
        it('should call addUser controller method', async () => {
            userController.addUser.mockImplementation((req, res) => res.status(201).json({ message: 'User added' }));

            // Send a POST request to create a new user
            const response = await request(app)
                .post('/api/users')
                .send({ name: 'John Doe', email: 'john@example.com' });

            expect(userController.addUser).toHaveBeenCalled();
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'User added' });
        });
    });

    // Test case for GET /api/users
    describe('GET /api/users', () => {
        it('should call fetchUsers controller method', async () => {
            userController.fetchUsers.mockImplementation((req, res) => res.status(200).json([{ id: 1, name: 'John Doe' }]));

            const response = await request(app).get('/api/users');

            expect(userController.fetchUsers).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, name: 'John Doe' }]);
        });
    });

    // Test cases for DELETE /api/users/:userId
    describe('DELETE /api/users/:userId', () => {
        it('should call deleteUser controller method', async () => {
            userController.deleteUser.mockImplementation((req, res) => res.status(200).json({ message: 'User deleted successfully' }));

            const response = await request(app).delete('/api/users/1');

            expect(userController.deleteUser).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'User deleted successfully' });
        });

        it('should return 404 if user is not found', async () => {
            userController.deleteUser.mockImplementation((req, res) => res.status(404).json({ error: 'User not found' }));

            const response = await request(app).delete('/api/users/1');

            expect(userController.deleteUser).toHaveBeenCalled();
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'User not found' });
        });
    });
});
