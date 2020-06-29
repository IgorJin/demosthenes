const config = require('../etc/config.json') 
const mongoose = require('mongoose');

exports.setUpConnection = async function() {
    try {
         await mongoose.connect(config.db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        'useCreateIndex': true,
        'useFindAndModify': false
    });
    } catch (e) {
        console.log(e)
    }
}