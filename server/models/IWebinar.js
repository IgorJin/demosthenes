const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const WebinarSchema = new Schema({
    title: String,
    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    id: String
})

const IWebinar = mongoose.model('IWebinar', WebinarSchema)

module.exports = IWebinar