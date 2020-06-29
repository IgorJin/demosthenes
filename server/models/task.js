const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Contact= require('./Contacts')

const TaskSchema = new Schema({
    text: String,
    date: {
        type: Date, 
        default: Date.now
    },
    type: String,
    recipient: { 
        type: Schema.Types.ObjectId, 
        ref: Contact
    },
    status: Number
})

module.exports = mongoose.model('Task', TaskSchema)