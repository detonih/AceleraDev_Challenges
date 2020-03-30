const jwt = require('jsonwebtoken')
const { auth } = require('../config')

let Auth = {}

Auth.getToken = async (req, res, next) => {
  const { body: { user, password } } = req;

  if(auth.user === user && auth.password === password) {
    const token = jwt.sign({  }, auth.secret, {  expiresIn: '1d'});

    res.status(200).json({
      token
    });
  } else {
    res.status(401).json({
      error: "Invalid user or password."
    })
  }
}

module.exports = Auth
