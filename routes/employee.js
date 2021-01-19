const express = require('express');
const router = express.Router();

router.get('/employee', (req, res) => {
    res.render('employee/employee');
})

router.get('/employee-specific-leave-form.ejs', (req, res) => {
    res.render('employee/employee-specific-leave-form.ejs');
})

router.get('/employee_profile/:id' , (req, res) => {
    res.render('employeeProfile/employee');
})

module.exports = router