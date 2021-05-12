const express = require('express');
const eventsController = require('../../controllers/eventsController')
const router = express.Router()

router.get('/', eventsController.getAll);
router.post('/create', eventsController.create);

module.exports = router;