const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorInit = require('../../util_functions/errorcrtr');
const User = require('../../models/user');
const UserData = require('../../models/userdata')

exports.user_signup = (req, res, next) => {
  User.find({email: req.body.email})
    .then((user) => {
      if (user.length >= 1) {
        next(errorInit('User Exists', 409));
      }else{
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          next(err);
        }
          const user = new User({
          email:req.body.email,
          password:hash,
        })
          user.save()
          .then((user) => {
            const admin = (user.email === process.env.ADMINID )
            const token = jwt.sign({
              email: user.email,
              userId: user._id,
            },
            process.env.SECRET, {
              expiresIn: '1h',
            });
            res.status(201)
              .json({
                message: 'Auth successful',
                idToken:token,
                expiresIn:3600,
                localId:user.email,
                admin:admin,
                cust:'true'
              });
          })
          .catch((err) => next(errorInit(`${err.message}database connection error`, 500)));
      })};
    })
    .catch((err) => next(errorInit(`${err.message}database connection error`, 500)));
};

exports.user_login = (req, res, next) => {
  User.find({
      email: req.body.email,
  })
    .then((user) => {
      console.log(user);
      bcrypt.compare(req.body.password, user[0].password, (err,result,isMatch) => {
        console.log(result);
        if (!result) {
          next(errorInit('Check password', 409));
        }
        if (result) {
          const admin = (user[0].email === process.env.ADMINID )
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.SECRET, {
            expiresIn: '1h',
          });
         res.status(202)
            .json({
              message: 'Auth successful',
              idToken:token,
              expiresIn:3600,
              localId:user.email,
              admin:admin,
              cust:'false'
            });
        }
      });
    })
    .catch((err) => next(errorInit(`${err.message}Check your Email`, 404)));
};

exports.user_form = async (req, res, next) => {
  UserData.find({email: req.userData.email})
  .then((user)=>{
    if(user.length>=1){
      next(errorInit('UserData Exists',409))
    }else{
      const newuserdata =new UserData({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        address: req.body.address,
        email: req.userData.email,
        firstPhone: req.body.firstPhone,
        secondPhone: req.body.secondPhone,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country
      })
      newuserdata.save().then((user)=>{
        res.status(200).json({message:'User Data Saved'})
      }).catch((err) => next(errorInit(`${err.message}database connection error`, 500)))
    }
  })
};

exports.users_list = (req, res, next) => {
  User.find()
  .then(users=>{
    res.json({
      data:users

    })
  })
  .catch((err)=> next(errorInit(`${err.message}database connection error`, 500)))


};

exports.user = (req, res, next) => {
  UserData.find({email:req.params.id})
  .then(users=>{
    res.json({
      data:users[0]

    })
  })
  .catch((err)=> next(errorInit(`${err.message}database connection error`, 500)))


};
