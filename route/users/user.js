const express=require('express');
const router=express.Router();
const user=require('../../controller/user/users.js')
const login=require('../../controller/user/login.js')


router.post('/users',user.post);
router.post('/login',login.post);
module.exports=router;