const mongoose = require('mongoose')
const config = require('../../etc/config.json')
const crypto = require('crypto')
const tokenKey = config.tokenKey 
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    displayName: String,
    username: String,
    email: {
        type: String,
        required: 'Укажите e-mail',
        unique: 'Такой e-mail уже существует'
    },
    passwordHash: String,
    token: String,
    socket: String
})
UserSchema.methods.generateToken = async () => {
    let head = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'jwt' })).toString('base64');
    let body = Buffer.from(JSON.stringify(this)).toString('base64');
    let signature = crypto.createHmac('SHA256', tokenKey).update(`${head}.${body}`).digest('base64'); 
    let token = `${head}.${body}.${signature}`
    this.token = token
    await this.save()
    return token
}
UserSchema.statics.findByCredentials  = async (email, password) => {
    const user = await User.findOne({ email})
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    if (password != user.passwordHash){
        throw new Error({ error: 'Invalid password credentials' })
    }
    return user
}

UserSchema.statics.findById  = async (id) => {
    let u = await User.findOne({ _id: id})
    return u 
}

const User = mongoose.model('User', UserSchema)

module.exports = User