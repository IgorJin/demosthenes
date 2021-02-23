const express = require('express');
const usersController = require('../../controllers/usersController')
const auth = require('../../middleware/auth')
const router = express.Router()

router.get('/auth', auth, usersController.authUser);
router.post('/', usersController.addUser);
router.post('/register-google', usersController.registerGoogleUser);
router.post('/login-google', usersController.loginGoogleUser);
router.post('/login', usersController.loginIn);

module.exports = router;