const express = require('express');
const webinarsController = require('../controllers/webinarsController')
const router = express.Router()

router.get('/:userId', webinarsController.showAll)
router.get('/add/:userId', webinarsController.create)

module.exports = router;