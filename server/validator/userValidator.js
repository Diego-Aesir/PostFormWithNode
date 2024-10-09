const { body } = require('express-validator');

const userValidator = [
  body('userName')
    .trim()
    .notEmpty().withMessage('User name is required.')
    .isLength({ min: 3, max: 20 }).withMessage('User name must be between 3 and 20 characters long.')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('User name can only contain letters, numbers, and underscores.'),

  body('userPassword')
    .trim()
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),

  body('userConfirmPassword')
    .trim()
    .notEmpty().withMessage('Password confirmation is required.')
    .custom((value, { req }) => {
      if (value !== req.body.userPassword) {
        throw new Error('Passwords do not match!');
      }
      return true;
    }),
];

module.exports = userValidator;
