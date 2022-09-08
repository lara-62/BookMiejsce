const express=require('express')
const router=express.Router();
const {verify}=require('../../middleware/user-verification')

const user_info=require('../../Database/User/user_author_status')
const people_info=require('../../Database/User/get_people_info')
router.get('/editprofile',verify,async(req,res)=>{
    
    res.render('edit-profile',{
        user:req.user,
        
    });
})
router.get('/quote',async(req,res)=>
{
    res.render('User/quote.ejs')
})
 router.post('/show_people_profile',verify,async(req,res)=>{
   
    let username=req.body.username.toLowerCase();
    let binds={
        username:'%'+username+'%'
    }
    let people=await people_info.get_user_byNAME(binds);
    //let friend=await people_info.friend_count({userid:req.params.user_id});
    res.render('User/show_people.ejs',{
        user:req.user,
        people:people,
        //friend:friend
    })
 })
 router.get('/show_Your_friends',verify,async(req,res)=>
    {
       let binds={
        userid1:req.user.USER_ID
       }
        let people=await people_info.get_your_friend(binds);
        //let friend=await people_info.friend_count({userid:req.params.user_id});
        res.render('User/Your_friends.ejs',{
            user:req.user,
            people:people,
            //friend:friend
        })
    })
//  router.post('/show_people_profile_detail',verify,async(req,res)=>{
   
//     let username=req.body.username.toLowerCase();
//     let binds={
//         username:'%'+username+'%'
//     }
//     let people=await people_info.get_user_byNAME(binds);
    


//  })
router.get('/profile1/:user_id',verify,async(req,res)=>
 {  
    // let msg=[];  
    // res.render('Home',{ msg:msg,error:[]})
    let user_following= await user_info.user_following_count({user_id:req.params.user_id});
    let people=await people_info.get_user_byID({userid:req.params.user_id});
    let review_count=await  people_info.user_review_count({user_id:req.params.user_id});
    let friend=await people_info.friend_count({userid:req.params.user_id});
    let is_friend=await people_info.is_friend_of({userid1:req.user.USER_ID,userid2:req.params.user_id})
    console.log(is_friend[0].COUNT);
    console.log(friend[0].COUNT);
    res.render('profile1.ejs',{
        user:req.user,
        people:people,
        user_following:user_following,
        review_count:review_count,
        friend:friend,
        is_friend:is_friend
    });

})

module.exports=router;