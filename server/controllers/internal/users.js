const IUser = require("../../models/IUser");
const config = require("../../../etc/config.json");
const Firebase = require("../../firebase");

async function addUser({ name, email, password }) {
  const user = await IUser.create({
    displayName: name,
    email,
    passwordHash: password,
  });

  return user;
}

async function findById({ id }) {
  return await IUser.findOne({ _id: id });
}

async function findByCredentials(email, password) {
  const user = await IUser.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  if (user.googleId && password && password != user.passwordHash) { //TODO: хэшировать пароль, условие в отдельную функцию, возвращающую 
    throw new Error({ error: "Invalid password credentials" });
  }
  return user;
}

async function setSocket({ id, socketId }) {
  return await IUser.findOneAndUpdate(
    { _id: id },
    { $set: { socket: socketId } },
    { new: true }
  );
}

module.exports = {
  addUser,
  findById,
  findByCredentials,
  setSocket,
};
