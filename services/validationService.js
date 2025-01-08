const { Validator } = require('node-input-validator');

async function validateUserInput(userData) {
    const validator = new Validator(userData, {
        name: 'required|string',
        email: 'required|email',
        role: 'required|in:Admin,Editor,Viewer',
    });

    const isValid = await validator.check();
    if (!isValid) {
        throw new Error(Object.values(validator.errors).map(err => err.message).join(', '));
    }
}

module.exports = { validateUserInput };