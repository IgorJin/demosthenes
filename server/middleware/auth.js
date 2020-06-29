const User = require('../models/User')
const config = require('../../etc/config.json') 
const crypto = require('crypto')

const auth = async(req, res, next) => {
    if (req.header('Authorization')){
        try {
            let user;
            const jwt = req.header('Authorization')
            const token = jwt.replace('Bearer ', '')
            let tokenParts = token.split('.')
            let signature = crypto.createHmac('SHA256', config.tokenKey).update(`${tokenParts[0]}.${tokenParts[1]}`).digest('base64');
            if (signature === tokenParts[2]){
                user = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('utf8'));
                //res.status(200).json(user);
                req.user=user
                next()
            }else{
                throw new Error()
            }  
        } catch (e) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
            
        }
    }
    
}
module.exports = auth