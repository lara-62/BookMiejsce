

const express=require('express')
const router=express.Router();
const middleware=require('../../middleware/user-verification')
router.get('/user-profile',middleware.verify,async(req,res)=>{
    //let user=await getUserbyID(req.user.)
        res.render('Account.ejs',{
            user:user
        })
})

module.exports=router;