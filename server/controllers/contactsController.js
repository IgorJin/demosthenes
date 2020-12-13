const IContact = require('../models/IContact')

exports.addContact = async function(req,res) {
    const contact = new IContact({
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
    await IContact.findById(req.params.id).remove()
    res.send('deleted Task id='+ req.params.id)
}

exports.showAll = function(req,res) {   
    IContact.find(function (err, contacts) {
        if (err) return console.error(err);
        res.send(contacts)
      })
}