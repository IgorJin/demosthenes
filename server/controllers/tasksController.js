//const { wrap: async } = require('co');
const Todo = require('../models/task')

exports.addTask = async function(req,res) {
    const card = new Todo({
    text: req.body.text,
    type: 'Задача',
    recipient: { 
        name: req.body.name, 
    },
    status: 0
    })
    await card.save()
    res.send('Add = Task('+card['_id']+')')
}

exports.editTask = async function(req,res) {
    console.log(req.body);
      await Todo.updateOne({_id : req.params.id}, {...req.body.data}, function (err, result) {
        if (err) return console.error(err);
        // console.log(result);
      })

      Todo.find( function (err, todos) {
        if (err) return console.error(err);
        res.send(todos)
      })
}

exports.showAll = async function(req,res) {   
    await Todo.find({_id: '5ead31d3161f693288e4512c'}, function (err, todos) {
        if (err) return console.error(err);
      }).populate('recipient') 
      .exec(function (err, todos) {
        if (err) return console.error(err);
        res.send(todos)
      });
}

exports.reqBody = function(req,res) {   
    console.log(req.body)
    res.send('Hello')
}

exports.deleteTask = async function(req,res) {
    await Todo.findById(req.params.id).remove()
    res.send('deleted Task id='+ req.params.id)
}



