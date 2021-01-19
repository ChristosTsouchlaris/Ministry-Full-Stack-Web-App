const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/employee', (req, res) => {
    res.render('employee/employee');
})

router.get('/employee_profile/leave_form', (req, res) => {
    res.render('employeeProfile/employee-specific-leave-form');
})

router.get('/employee_profile/:id' , (req, res) => {
    res.render('employeeProfile/employee');
})

router.post('/employee/:id/new_leave_form', async (req, res, next) => {
    const { firstName, lastName, amka, from, until } = req.body;
    console.log(req.body)
    // Find the employee with the id from the ulr
    const employee = await User.findById(req.params.id)

    if( !firstName || !lastName || !amka || !from || !until ) {
        req.flash('error', "Δεν δώσατε όλα τα στοιχεία!")
        res.redirect('/employee_profile/leave_form')
    }
    else if(employee.amka !== amka || employee.firstName !== firstName || employee.lastName !== lastName ) {
        req.flash('error', "Δεν δώσατε το σωστά στοιχεία!")
        res.redirect('/employee_profile/leave_form')
    }
    else {
        employee.permitSpecialPurpose.permited = true;
        employee.permitSpecialPurpose.from = from;
        employee.permitSpecialPurpose.until = until;
        await employee.save();
        req.flash('success', "Δήλωσες την άδεια ειδικού σκοπού!")
        res.redirect(`/employee_profile/${ req.params.id }`)
    }

    // // Find the employer with the id from the url
    // const employer = await User.findById(req.params.id).populate('employees');
    // // console.log(employer.employees["_id"]);
    // // Find the employee from the given amka
    // const employee = await User.findOne({amka: amka});

    // // Check if this employee already works for this employer
    // if (employer.employees.filter(function(e) { return e.amka == employee.amka; }).length > 0) {
    //     req.flash('error', "Αυτός ο υπάλληλος δουλεύει ήδη για εσάς!");
    //     res.redirect(`/employer_profile/${employer._id}/employer_staff`)
    // }
    // else if(!employee) {
    //     req.flash('error', "Δεν υπάρχει υπάλληλος με αυτό το ΑΜΚΑ");
    //     res.redirect(`/employer_profile/${employer._id}/employer_staff`)
    // }
    // else {
    //     employer.employees.push(employee);
    //     await employer.save();
    //     req.flash('success', "Μπράβο εισήγαγες ένα υπάλληλο!")
    //     res.redirect(`/employer_profile/${employer._id}/employer_staff`)
    // }
});

module.exports = router