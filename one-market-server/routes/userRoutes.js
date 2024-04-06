const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/loginCheck', userController.loginCheck);
router.get('/getSession', userController.getSession);

module.exports = router;
