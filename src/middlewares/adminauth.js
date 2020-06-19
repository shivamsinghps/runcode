const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userData = decoded;
    if(req.userData.email===process.env.ADMINID){
    next();
    }
    else{
      throw Error()
    }
    return req.userData;

  } catch (error) {
    return res.status(401)
      .json({
        message: 'Authentication failed Not Admin',
      });
  }
};
