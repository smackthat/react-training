const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes').StatusCodes;

const authMiddlware = (req, res, next) => {

  if (req.originalUrl.includes('api/auth')) {
    next();
  }
  else {
    const authorization = req.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      const token = authorization.substring(7);
  
      try {
        jwt.verify(token, process.env.AUTHSECRET);
        next();
      } catch (error) {
        res.sendStatus(StatusCodes.FORBIDDEN);
      }
    }
    else {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
  }

};

module.exports = authMiddlware;