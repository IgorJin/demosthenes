const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const MeetingSchema = new Schema({
    title: String,
    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    id: String,
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

MeetingSchema.statics.findById  = async (id) => {
    let wb = await IMeeting.findOne({ id}).populate('host') 
    return wb
}

MeetingSchema.statics.addUser  = async (id, userId) => {
    await IMeeting.updateOne({id}, {$addToSet : {users: userId}})
}
MeetingSchema.statics.getUsers  = async (id) => {
    return await IMeeting.findOne({ id}).populate('users')
}

const IMeeting = mongoose.model('IMeeting', MeetingSchema)

module.exports = IMeeting