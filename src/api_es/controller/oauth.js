const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorInit = require('../../util_functions/errorcrtr');
const User = require('../../models/user');

exports.oauthlog = (req, res, next) => {
  User.find({
      email: req.user.email,
  })
    .then((user) => {
      const admin = (user[0].email === process.env.ADMINID )
          const token = jwt.sign({
            email: user[0].email,
            userId: user._id,
          },
          process.env.SECRET, {
            expiresIn: '1h',
          });

         res.redirect(`http://localhost:3000/?t=${token}&s=3600&u=${user[0].email}&a=${admin}`);

      })
    .catch((err) => next(errorInit(`${err.message}Check your Email`, 404)));
};
