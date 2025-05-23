const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');

router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  validateRequest,
  registerUser
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validateRequest,
  loginUser
);

router.route('/me').get(protect, getMe).put(protect, updateMe);

module.exports = router;
