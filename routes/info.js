const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('information/info')
})

router.get('/info-first', (req, res) => {
    res.render('information/info-first')
})

router.get('/info-general', (req, res) => {
    res.render('information/info-general')
})

router.get('/info-general/newsletter', (req, res) => {
    res.render('information/newsletter')
})

module.exports = router