const express = require('express');
const eventsController = require('../../controllers/eventsController')
const router = express.Router()

router.get('/', eventsController.getAll);
router.get('/add/:userId', eventsController.create);

module.exports = router;