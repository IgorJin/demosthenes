const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser     = require('body-parser');
const contactsRouter = require('./routes/contacts')
const tasksRouter = require('./routes/tasks')
const usersRouter = require('./routes/users')  
const db = require('./db') 
const config = require('../etc/config.json') 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Hello on index page')
})
app.use('/api/tasks', tasksRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)
db.setUpConnection();
app.listen(config.port, () => console.log(`Example app listening at http://localhost:${config.port}`))
