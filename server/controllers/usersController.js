const IUser = require("../models/IUser");
const config = require("../../etc/config.json");
const Firebase = require("../firebase");
const Users = require("./internal/users");

async function addUser(req, res) {
  const user = await Users.addUser({ ...req.body.user });
  const token = await user.generateToken();
  res.cookie("authcookie", token, {
    maxAge: 900000,
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(200).json({
    user,
    token,
  });
}

async function authUser(req, res) {
  res.status(200).json(req.user);
}

async function loginIn(req, res) {
  try {
    const { email, password } = req.body.user;
    const user = await Users.findByCredentials(email, password);
    if (!user) {
      throw new Error("Dont find user");
    }
    let token = await user.generateToken();
    res.cookie("authcookie", token, {
      maxAge: 900000,
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send(e);
  }
}

async function addGoogleUser(req, res) {
  try {
    const { name, email } = await Firebase.verifyIdToken(req.body.data.token);
    const user = await Users.addUser({ name, email });
    const token = await user.generateToken();
    res.cookie("authcookie", token, {
      maxAge: 900000,
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send(e);
  }
}

module.exports = {
  addUser,
  authUser,
  loginIn,
  addGoogleUser,
};
