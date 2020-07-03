const IWebinar = require('../models/IWebinar')

exports.create = async (req, res) => {
        let id = ''+parseInt(Math.random(1)*20)
        const webinar = new IWebinar({
            title: 'new Webinar', //change
            host: req.params.userId,
            id
        })
        await webinar.save()
        res.send(id)
}

exports.showAll = async(req, res) => {
    console.log(req.params, 'req.params')
    await IWebinar.find({host: req.params.userId}, (err, webinars)=>{
        if (err) return console.error(err);
    })
    .populate('host') 
    .exec((err, webs)=>{
        if (err) return console.error(err);
        res.send(webs)
    })
}