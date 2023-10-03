const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Autorization");
  console.log("first");
  if (!token) {
    return res.status(401);
  }
  jwt.verify(token, "secret", (err, decode) => {
    if (err) {
      console.log(err);
    }
    req.user = decode;
    console.log(decode);
    next();
  });
}

module.exports = verifyToken;
