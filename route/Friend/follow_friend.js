const express=require('express')
const router=express.Router();
const {verify}=require('../../middleware/user-verification')
const follow=require('../../Database/User/get_people_info')


router.get('/follow_friend/:user_id',verify,async(req,res)=>
{    
    var date1=new Date();
    date1=date1.toISOString().slice(0,10);
    let binds={
        userid1:req.user.USER_ID,
        userid2:req.params.user_id,
        date_added:date1
    }
    await follow.follow_friend(binds);
    res.redirect('/profile1/'+req.params.user_id);
    
})

module.exports=router;