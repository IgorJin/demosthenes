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
const IUser = require('./models/User')
const IWebinar = require('./models/IWebinar')

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

io.on('connection', async (socket)=>{
    console.log(`Socket ${socket.id} connected`);
    let webinar
    let user
    socket.on('join', async ({room, currentUser}) => {
        socket.join(room)
        user = await IUser.findById(currentUser)
        user.socket = socket.id
        await user.save()
        webinar = await IWebinar.findById(room)
        if (webinar.host._id != currentUser) {
            await IWebinar.addUser(room, currentUser)
        }
        webinar = await IWebinar.getUsers(room)
        io.to(room).emit('NEW_USER', {user:'admin', newUser: user, webinar, message: `Welcome to Room #${room}, ${user.displayName}` })
    })
    socket.on('sendMessage', async (message) => {
        user = await IUser.findOne({socket:message.user})
        io.to(message.room).emit('getMessage', { user:user.displayName, message: message.message})
    })
    socket.on('callUser', (data)=>{
        console.log(data.to);
        io.to(data.to).emit('outgoing', {signal:data.signalData, from:data.from})
    })
    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
    socket.on('disconnect', () => {
        console.log('disconnect');
    })
    
})

server.listen(config.port, () => console.log(`Server listening at http://localhost:${config.port}`))