const mongoose = require("mongoose");
const config = require("../../etc/config.json");
const crypto = require("crypto");
const tokenKey = config.tokenKey;

const UserSchema = mongoose.Schema({
  displayName: String,
  username: String,
  email: {
    type: String,
    required: "Укажите e-mail",
    unique: "Такой e-mail уже существует",
  },
  passwordHash: String,
  token: String,
  socket: String,
  googleId: String,
});

UserSchema.methods.generateToken = async function () {
  let head = Buffer.from(JSON.stringify({ alg: "HS256", typ: "jwt" })).toString(
    "base64"
  );
  let body = Buffer.from(JSON.stringify(this.id)).toString("base64");
  let signature = crypto
    .createHmac("SHA256", tokenKey)
    .update(`${head}.${body}`)
    .digest("base64");
  let token = `${head}.${body}.${signature}`;
  this.token = token;
  await this.save();
  return token;
};

module.exports = mongoose.model("User", UserSchema);
