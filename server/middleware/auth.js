const Users = require("../controllers/internal/users");
const config = require("../../etc/config.json");
const crypto = require("crypto");

const auth = async (req, res, next) => {
  if (req.cookies.authcookie) {
    try {
      let userId;
      const jwt = req.cookies.authcookie;
      const token = jwt.replace("Bearer ", "");
      let tokenParts = token.split(".");
      let signature = crypto
        .createHmac("SHA256", config.tokenKey)
        .update(`${tokenParts[0]}.${tokenParts[1]}`)
        .digest("base64");
      if (signature === tokenParts[2]) {
        userId = JSON.parse(
          Buffer.from(tokenParts[1], "base64").toString("utf8")
        );
        req.user = await Users.findById({ id: userId });
        next();
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log("auth -> e", e);
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  }
};
module.exports = auth;
