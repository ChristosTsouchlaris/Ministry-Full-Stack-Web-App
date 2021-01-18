const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const {isLoggedIn} = require('../views/middleware');

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res, next) => {
    try {
    const { email, phone, amka, occupation, username, password } = req.body;
    const user = new User({email, phone, amka, occupation, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) 
            return next(err);
        else {
            req.flash('success', 'Welcome to ypakp!!')
            res.redirect('/')
        }
    })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register')
    }    
});

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),(req, res) => {
    req.flash('success', 'Welcome back')
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!")
    res.redirect('/');
})

module.exports = router;
