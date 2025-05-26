const express = require('express');
const router = express.Router();
const User = require('../models/user');
const WrapAsync = require('../utils/WrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const userController = require('../controllers/users');
const user = require('../models/user');


router.get('/signup', userController.renderSignupForm);

router.post('/signup', WrapAsync(userController.signup));


router.get('/login', userController.renderLoginForm);


router.post('/login',saveRedirectUrl, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login);


router.get("/logout",userController.logout);

module.exports = router;