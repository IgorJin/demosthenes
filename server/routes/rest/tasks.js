const express = require('express');
const tasksController = require('../../controllers/tasksController')

const router = express.Router()

router.get('/', tasksController.showAll);

router.get('/add/:name/:text', tasksController.addTask);

router.get('/delete/:id', tasksController.deleteTask);

router.post('/edit/:id', tasksController.editTask);

router.post('/', tasksController.reqBody);

module.exports = router;