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
    const today = new Date();
    var dd = await String(today.getDate()).padStart(2, '0');
    var mm = await String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = await today.getFullYear();

    const employer = await User.findById(req.params.id).populate('employees');
    console.log(employer)
    res.render('employerProfile/employer-staff', { employer, dd, mm, yyyy});
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
    else if(!employee) {
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

router.post('/employer/:employer_id/manip_status/:employee_id', async (req, res, next) => {
    const { action, from, until } = req.body;
    console.log(req.body)
    console.log(from)
    console.log(typeof from)
    // // Find the employer with the id from the url
    const employer = await User.findById(req.params.employer_id).populate('employees');
    // // Find the employee from the given amka
    const employee = await User.findById(req.params.employee_id);

    if(action === "1") {
        employee.telework = true;
        employee.teleFrom = from;
        employee.teleUntil = until;
        await employee.save();
    }
    else if(action === "2") {
        employee.suspensionOfContact = true;
        employee.susFrom = from;
        employee.susUntil = until;
        await employee.save();
    }
    
    res.redirect(`/employer_profile/${employer._id}/employer_staff`);
});

router.post("/employer/:employer_id/undo_tele_status/:employee_id", async (req, res, next) => {
    // // Find the employer with the id from the url
    const employer = await User.findById(req.params.employer_id).populate('employees');
    // // Find the employee from the given amka
    const employee = await User.findById(req.params.employee_id);

    employee.telework = false;
    employee.teleFrom = '';
    employee.teleFrom = '';
    await employee.save();
    
    res.redirect(`/employer_profile/${employer._id}/employer_staff`);
});

router.post("/employer/:employer_id/undo_suspension_status/:employee_id", async (req, res, next) => {
    // // Find the employer with the id from the url
    const employer = await User.findById(req.params.employer_id).populate('employees');
    // // Find the employee from the given amka
    const employee = await User.findById(req.params.employee_id);

    employee.suspensionOfContact = false;
    employee.susFrom = '';
    employee.susUntil = '';
    await employee.save();
    
    res.redirect(`/employer_profile/${employer._id}/employer_staff`);
});

router.post("/employer/:employer_id/undo_perm_special_purpose_status/:employee_id", async (req, res, next) => {
    // // Find the employer with the id from the url
    const employer = await User.findById(req.params.employer_id).populate('employees');
    // // Find the employee from the given amka
    const employee = await User.findById(req.params.employee_id);

    employee.permitSpecialPurpose.permited = false;
    employee.permitSpecialPurpose.from = '';
    employee.permitSpecialPurpose.until = '';
    
    await employee.save();
    
    res.redirect(`/employer_profile/${employer._id}/employer_staff`);
});



module.exports = router