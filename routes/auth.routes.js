const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.post(
  '/auth/register',
  imageUpload.single(avatar),
  AuthController.register
);
router.post('/auth/login', AuthController.login);
router.get('/auth/user', authMiddleware, AuthController.getUser);
router.delete('/auth/logout', authMiddleware, AuthController.logout);

module.exports = router;
