const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res) => {
    try {
    const { email, phone, occupation, username, password } = req.body;
    const user = new User({email, phone, occupation, username});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    res.redirect('/')
    } catch(e) {
        // req.flash('error', e.message);
        res.redirect('register')
    }    
});

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),(req, res) => {
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/info');
})

module.exports = router;
