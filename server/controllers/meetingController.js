const IMeeting = require('../models/IMeeting')

exports.create = async (req, res) => {
        let id = ''+parseInt(Math.random(1)*20)
        const meeting = new IMeeting({
            title: 'new meeting', //change
            host: req.params.userId,
            id
        })
        await meeting.save()
        res.send(id)
}

exports.showAll = async(req, res) => {
    await IMeeting.find({host: req.params.userId}, (err, meetings)=>{
        if (err) return console.error(err);
    })
    .populate('host') 
    .exec((err, webs)=>{
        if (err) return console.error(err);
        res.send(webs)
    })
}