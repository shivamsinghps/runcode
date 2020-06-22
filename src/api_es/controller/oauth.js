const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorInit = require('../../util_functions/errorcrtr');
const User = require('../../models/user');
const UserData = require('../../models/userdata')

exports.oauthlog = async(req, res, next) => {
  const result = await UserData.find({email:req.user.email})
  const newcust = result.length !== 0
  console.log(newcust);
  User.find({
      email: req.user.email,
  })
    .then((user) =>{
      const admin = (user[0].email === process.env.ADMINID )
          const token = jwt.sign({
            email: user[0].email,
            userId: user._id,
          },
          process.env.SECRET, {
            expiresIn: '1h',
          });

         res.redirect(`http://localhost:3000/?t=${token}&s=3600&u=${user[0].email}&a=${admin}&ncust=${!newcust}`);

    } )
    .catch((err) => next(errorInit(`${err.message}Check your Email`, 404)));
};





// UserData.find({email:user[0].email}).then((user)=>{
//     if(user.length>=1){
//        res.redirect(`http://localhost:3000/?t=${token}&s=3600&u=${user[0].email}&a=${admin}`);
//     }else{
//       res.redirect(`http://localhost:3000/Details?t=${token}&s=3600&u=${user[0].email}&a=${admin}&newuser=${true}`);
//          }
//   })
