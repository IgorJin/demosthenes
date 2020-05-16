const Contact = require('../models/contacts')

exports.addContact = async function(req,res) {
    const contact = new Contact({
        name: {
            first: 'AAron',
            last: 'Ramsey'
        },
        email: 'aaron.ramsyq16@gmail.com',
        companyName: 'Arsenal',
        role: 'Player',
        forecast: 100,
        recentActivity: new Date()
    })
    await contact.save()
    res.send('Add Contact('+contact['_id']+')')
}

exports.deleteContact = async function(req,res) {
    await Contact.findById(req.params.id).remove()
    res.send('deleted Task id='+ req.params.id)
}

exports.showAll = function(req,res) {   
    Contact.find(function (err, contacts) {
        if (err) return console.error(err);
        res.send(contacts)
      })
}