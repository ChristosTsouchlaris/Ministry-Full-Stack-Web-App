const express = require('express');
const router = express.Router();

router.get('/employer', (req, res) => {
    res.render('employer/employer');
})

router.get('/employer_profile' , (req, res) => {
    res.render('employerProfile/employer');
})

router.get('/employer_profile/employer_staff' , (req, res) => {
    res.render('employerProfile/employer-staff');
})

module.exports = router