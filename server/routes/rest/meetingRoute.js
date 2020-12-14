const express = require('express');
const meetingController = require('../../controllers/meetingController')
const router = express.Router()

router.get('/:userId', meetingController.showAll)
router.get('/add/:userId', meetingController.create)

module.exports = router;