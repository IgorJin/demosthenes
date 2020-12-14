const express = require('express');
const contactsController = require('../../controllers/contactsController')

const router = express.Router()

router.get('/', contactsController.showAll);

router.get('/add', contactsController.addContact);

router.get('/delete/:id', contactsController.deleteContact);


module.exports = router;