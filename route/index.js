const express=require('express')
const router=express.Router();
const oracledb=require('oracledb')
const bcrypt=require('bcrypt')
const con=require('./oracleCon');
const { redirect } = require('statuses');
router.post('/auth-signup',(req,res,next)=>{
    const fullname=req.body.fullname;
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    const conpassword=req.body.conpassword;
    const date=req.body.date;
    res.redirect('/auth-signup');

})
router.get('/auth-signup',(req,res)=>{
    res.render('Account')
    
})
module.exports=router;