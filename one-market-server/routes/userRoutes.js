const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/loginCheck', userController.loginCheck);
router.post('/logout', userController.logout);
router.post('/userData', userController.userData);
router.post('/editUserInfo', userController.editUserInfo);

module.exports = router;
