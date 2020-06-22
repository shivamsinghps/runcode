const express = require('express')
const passport = require('passport')
const router = express.Router()
const UserController = require('./controller/user')
const OAuthController = require('./controller/oauth')

const checkAuth = require('../middlewares/auth')
const checkAdmin = require('../middlewares/adminauth')

router.get('/users',checkAdmin,UserController.users_list)

router.get('/user/:id',checkAdmin,UserController.user)

router.post('/signup', UserController.user_signup)

router.post('/login', UserController.user_login)

router.post('/profileSetup', checkAuth, UserController.user_form)

// router.get('/oauthredirect',passport.authenticate('google',
// { failureRedirect: process.env.CLIENT_SITE+'/Login' }),OAuthController.user)

router.get("/auth/google",
  passport.authenticate('google', { scope: ["profile","email"] })
)

router.get('/oauthredirect',
passport.authenticate('google',
{ failureRedirect: 'http://localhost:3000/Login' }),
  OAuthController.oauthlog);

module.exports = router
