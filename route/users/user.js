const express=require('express');
const router=express.Router();
const user=require('../../controller/user/users.js')
const login=require('../../controller/user/login.js');
const { redirect } = require('statuses');


router.post('/users',user.post);
router.post('/login',login.post);
router.get('/Home_page',(req,res)=>{
    res.redirect('/user-profile');
})
module.exports=router;