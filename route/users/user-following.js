const express=require('express')
const router=express.Router();
const {verify}=require('../../middleware/user-verification')
const DB_user=require('../../controller/user/get_user')
const DB_bookinfo=require('../../Database/Books/addToshelf')
const author=require('../../Database/User/user_author_status');
const author_count=require('../../Database/Author/author')

router.get('/user-following',verify,async(req,res)=>{
    let binds={
        user_id:req.user.USER_ID
    }
   const follow_author=await author.user_following_allauthor(binds);
   const book_count=await author_count.all_author_book_count();
   const follower_count=await author_count.all_author_follower_count();
   res.render('User/user-following.ejs',{
     user:req.user,
     author:follow_author,
     book_count:book_count,
     follower_count:follower_count,
   })

})

module.exports=router;