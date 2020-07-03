const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser     = require('body-parser');
const contactsRouter = require('./routes/contacts')
const tasksRouter = require('./routes/tasks')
const usersRouter = require('./routes/users')  
const webinarRouter = require('./routes/webinarRoute')  
const db = require('./db') 
const config = require('../etc/config.json') 
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
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
app.use('/api/webinars', webinarRouter)

db.setUpConnection();

io.on('connection', (socket)=>{
    console.log(`Socket ${socket.id} connected`);
    io.emit('sendMessage', { user: 'admin', message: `Welcome to room ${socket.id}` })
    socket.on('join', (room) => {
        socket.join(room)
        io.to(room).emit('NEW_USER', { name: 'CurrentUser join channel' })
    })
    //socket.broadcast.to()
    socket.on('disconnect', () => {
        console.log('disconnect');
    })
    
})

server.listen(config.port, () => console.log(`Server listening at http://localhost:${config.port}`))