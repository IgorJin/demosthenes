const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const WebinarSchema = new Schema({
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

WebinarSchema.statics.findById  = async (id) => {
    let wb = await IWebinar.findOne({ id}).populate('host') 
    return wb
}

WebinarSchema.statics.addUser  = async (id, userId) => {
    await IWebinar.updateOne({id}, {$addToSet : {users: userId}})
}
WebinarSchema.statics.getUsers  = async (id) => {
    return await IWebinar.findOne({ id}).populate('users')
}

const IWebinar = mongoose.model('IWebinar', WebinarSchema)

module.exports = IWebinar