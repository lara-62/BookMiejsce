const express=require('express');

const router =express.Router();
router.post('/sign_up',(req,res)=>
{   let msg=[];
    res.render('Sign_up.ejs',{msg:msg});
})
module.exports=router;

