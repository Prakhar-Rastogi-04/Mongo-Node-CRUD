const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


router.get('/' , (req, res) => {
    // res.json('first get API');
    res.render('employee/addOrEdit',{
        viewTitle : 'Add Employees'
    })
});

router.get('/list' , (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.render('employee/employeeList',{
                list : docs
            })
        }
        else console.log('errors in retrieving emp list ', err);
    })
   
});

router.post('/' , (req, res) => {
    console.log('post request called...',req.body)
    if(req.body.empId == '' || req.body.empId == undefined  )
        insertEmployee(req,res);
    else updateEmployee(req,res);
});

router.get('/:id' , (req, res) => {
    console.log('open update page')
    Employee.findById(req.params.id, (err, result) => {
        if(!err) {
            res.render('employee/addOrEdit',{
                viewTitle : 'Edit Employees',
                employee : result
            })
        } else console.log('errors in updating the employee ');
    })
});

router.get('/delete/:id', (req, res) => {
    console.log('delete called')
    Employee.findByIdAndRemove(req.params.id, (err, result) => {
        if(!err) res.redirect('/employees/list');
        else console.log('error occured ', err);
    })
})

function insertEmployee (req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    employee.save((err , result)=>{
        if(!err) res.redirect('employees/list');
        else console.log('error occured ', err);
    })
}

function updateEmployee(req, res) {
    console.log('updateEmployee');
    Employee.findOneAndUpdate({_id : req.body.empId} , req.body, {new : true}, (err, result) => {
        console.log('result   ',result);
        if (!err) res.redirect('employees/list');
        else console.log('error occured ', err);
    })
}

module.exports = router;

