const express=require('express');

const router =express.Router();
router.post('/sign_up',(req,res)=>
{
    res.render('Sign_up.ejs');
})
module.exports=router;