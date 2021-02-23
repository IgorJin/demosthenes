const express = require('express');
const usersController = require('../../controllers/usersController')
const auth = require('../../middleware/auth')
const router = express.Router()

router.get('/auth', auth, usersController.authUser);
router.post('/', usersController.addUser);
router.post('/google', usersController.addGoogleUser);
router.post('/login', usersController.loginIn);

module.exports = router;