const express = require('express');
const router = express.Router();

router.get('/ministry/contact', (req, res) => {
    res.render('ministry/contact')
})

router.get('/ministry/rendezvous', (req, res) => {
    res.render('ministry/rendezvous')
})

router.post('/ministry/rantevou/make_a_date', (req, res) => {
    const { lname, fname, email, phone, address, date } = req.body;
    if(!lname || !fname || !email || !phone || !address || !date ) {
        req.flash('error', "Πρέπει να συμπληρώσετε όλα τα πεδία!")
        res.redirect('/ministry/rendezvous')
    }
    else {
        req.flash('success', "Κλείσατε το ραντεβού!")
        res.redirect('/ministry/contact')
    }
})

module.exports = router;