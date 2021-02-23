const firebaseAdmin = require("firebase-admin");
const config = require("../../etc/config.json");

function init() {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(config.FIREBASE_APPLICATION_CREDENTIALS),
    databaseURL: config.FIREBASE_DATABASE_URL,
  });
}

async function verifyIdToken(idToken) {
  return firebaseAdmin.auth().verifyIdToken(idToken);
}

module.exports = {
  init,
  verifyIdToken,
};
