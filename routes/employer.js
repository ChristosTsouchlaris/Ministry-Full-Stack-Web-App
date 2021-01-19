const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/employer', (req, res) => {
    res.render('employer/employer');
})

router.get('/employer_profile/:id' , (req, res) => {
    res.render('employerProfile/employer');
})

router.get('/employer_profile/:id/employer_staff' , async (req, res) => {
    const employer = await User.findById(req.params.id).populate('employees');
    console.log(employer)
    res.render('employerProfile/employer-staff', { employer });
})

router.post('/employer/:id/new_employee', async (req, res, next) => {
    const { amka } = req.body;
    // Find the employer with the id from the url
    const employer = await User.findById(req.params.id).populate('employees');
    // console.log(employer.employees["_id"]);
    // Find the employee from the given amka
    const employee = await User.findOne({amka: amka});

    // Check if this employee already works for this employer
    if (employer.employees.filter(function(e) { return e.amka == employee.amka; }).length > 0) {
        req.flash('error', "Αυτός ο υπάλληλος δουλεύει ήδη για εσάς!");
        res.redirect(`/employer_profile/${employer._id}/employer_staff`)
    }

    if(!employee) {
        req.flash('error', "Δεν υπάρχει υπάλληλος με αυτό το ΑΜΚΑ");
        res.redirect(`/employer_profile/${employer._id}/employer_staff`)
    }
    else {
        employer.employees.push(employee);
        await employer.save();
        req.flash('success', "Μπράβο εισήγαγες ένα υπάλληλο!")
        res.redirect(`/employer_profile/${employer._id}/employer_staff`)
    }
});

module.exports = router