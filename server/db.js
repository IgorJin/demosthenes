const config = require('../etc/config.json') 
const mongoose = require('mongoose');

exports.setUpConnection = async function() {
    try {
         await mongoose.connect(config.db,{
        useNewUrlParser: true,
    });
    } catch (e) {
        console.log(e)
    }
}