const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        first: String,
        last: String
    }, 
    photo: String,
    email: String,
    companyName: String,
    role: String,
    forecast: Number,
    recentActivity: {
        type: Date, 
        default: Date.now
    },
})

ContactSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

module.exports = mongoose.model('Contact', ContactSchema)