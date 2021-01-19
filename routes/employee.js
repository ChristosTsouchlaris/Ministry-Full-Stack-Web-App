const express = require('express');
const router = express.Router();

router.get('/employee', (req, res) => {
    res.render('employee/employee');
})

router.get('/employee_profile/leave_form', (req, res) => {
    res.render('employeeProfile/employee-specific-leave-form');
})

router.get('/employee_profile/:id' , (req, res) => {
    res.render('employeeProfile/employee');
})

module.exports = router