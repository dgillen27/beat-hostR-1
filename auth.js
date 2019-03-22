const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT = parseInt(process.env.SALT);
const TOKEN_KEY = process.env.TOKEN_KEY;

const hashPassword = async (pass) => {
  const digest = await bcrypt.hash(pass, SALT);
  return digest;
};

const genToken = (data) => {
  const token = jwt.sign(data, TOKEN_KEY);
  return token;
};

const isAuthorized = async (password, password_digest) => {
  return await bcrypt.compare(password, password_digest);
};

const restrict = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_KEY);
    res.locals.user = data;
    next();
  } catch(e) {
    console.log(e);
    res.status(403).send(`Unathorized, turn back ye!`);
  };
};

module.exports = {
  hashPassword,
  isAuthorized,
  genToken,
  restrict,
};
