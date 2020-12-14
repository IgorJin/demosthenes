const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const IContact= require('./IContact')

const TaskSchema = new Schema({
    text: String,
    date: {
        type: Date, 
        default: Date.now
    },
    type: String,
    recipient: { 
        type: Schema.Types.ObjectId, 
        ref: IContact
    },
    status: Number
})

module.exports = mongoose.model('ITask', TaskSchema)