

const express=require('express')
const router=express.Router();
const {verify}=require('../../middleware/user-verification')
const DB_user=require('../../controller/user/get_user')
const DB_bookinfo=require('../../Database/Books/addToshelf')
router.get('/user-profile',verify,async(req,res)=>{
      let user=await DB_user.getUserById(req.user.USER_ID)
      let bookinfo=await DB_bookinfo.getuserbookself(req.user.USER_ID) 
      let hasread=await DB_bookinfo.gethasreadbooks(req.user.USER_ID)
      let willread=await DB_bookinfo.getwillreadbooks(req.user.USER_ID)
      let Reading=await DB_bookinfo.getreadingbooks(req.user.USER_ID)
      console.log(bookinfo);
      console.log(willread);
      console.log(req.user)
      console.log('zadu');
        res.render('Account.ejs',{
            user:user,
            hasread:hasread,
            willread:willread,
            Reading:Reading,
            bookcount:bookinfo
        })
})

module.exports=router;