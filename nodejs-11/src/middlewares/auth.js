const jwt = require('jsonwebtoken')
const { auth } = require('../config')

module.exports = (req, res, next) => {
  const token = req.get('x-auth-token');
  console.log(token)

  jwt.verify(token, auth.secret, (err, decoded) => {
    if(err) {
      console.log(err);
      res.status(401).json({
        error: "Invalid token."
      })
    } else {
      req.locals = {
        status: 200,
        message: 'You are authorized'
      }
      next();
    }
  });
}
