const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/employer', (req, res) => {
    res.render('employer/employer');
})

router.get('/employer_profile' , (req, res) => {
    res.render('employerProfile/employer');
})

router.get('/employer_profile/employer_staff' , (req, res) => {
    res.render('employerProfile/employer-staff');
})

router.post('/employer/:id/new_employee', async (req, res, next) => {
    const { amka } = req.body;
    // Find the employer with the id from the url
    const employer = await User.findById(req.params.id);
    // Find the employee from the given amka
    const employee = await User.findOne({amka: amka});
    if(!employee) {
        req.flash('error', "There doesn't exist an employer with that AMKA. Try again!");
        res.redirect('/employer_profile/employer_staff')
    }
    else {
        employer.employees.push(employee);
        await employer.save();
        req.flash('success', "Good job, you inserted an employee!")
        res.redirect('/employer_profile/employer_staff')
    }
});

module.exports = router