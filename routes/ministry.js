const express = require('express');
const router = express.Router();

router.get('/ministry/contact', (req, res) => {
    res.render('ministry/contact')
})

router.get('/ministry/rendezvous', (req, res) => {
    res.render('ministry/rendezvous')
})

module.exports = router;