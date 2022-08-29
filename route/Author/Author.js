const express=require('express')
const  router=express.Router()
const booklist=require('../../Database/Books/books')
const {verify}=require('../../middleware/user-verification')
// const review=require('../../Database/Books/review')
// const DB_bookinfo=require('../../Database/Books/addToshelf')
const DB_author=require('../../Database/Author/author')
// const DB_user=require('../../Database/User/user_Reading_status')
const DB_author_follow=require('../../Database/User/user_author_status')
const auth = require('../../middleware/auth')



router.post('/follow_author/:user_id/:author_id/:book_id',async(req,res)=>
{
    var date1=new Date();
    let user_id=req.params.user_id;
    let author_id=req.params.author_id
    date1=date1.toISOString().slice(0,10);
    let binds={
        user_id:user_id,
        author_id:author_id,
        date_added:date1
    }
   await DB_author_follow.follow_author(binds);
   res.redirect('/Book_detail/'+req.params.book_id);
})
router.post('/follow_author/:user_id/:author_id',async(req,res)=>
{
    var date1=new Date();
    let user_id=req.params.user_id;
    let author_id=req.params.author_id
    date1=date1.toISOString().slice(0,10);
    let binds={
        user_id:user_id,
        author_id:author_id,
        date_added:date1
    }
   await DB_author_follow.follow_author(binds);
   res.redirect('/user-following');
})
router.post('/follow_author/:user_id/:author_id',async(req,res)=>
{
    var date1=new Date();
    let user_id=req.params.user_id;
    let author_id=req.params.author_id
    date1=date1.toISOString().slice(0,10);
    let binds={
        user_id:user_id,
        author_id:author_id,
        date_added:date1
    }
   await DB_author_follow.follow_author(binds);
   res.redirect('/author_detail/'+author_id);
})
router.get('/author_detail/:author_id',verify,async(req,res)=>
{
    let bind = {
        user_id: req.user.USER_ID,
        author_id: req.params.author_id
    }

    let author_following = await DB_author_follow.user_following_author(bind)
    let author_book_count = await DB_author.author_book_count(req.params.author_id);
    let author_follower=await DB_author_follow.author_follower_count({ author_id: req.params.author_id})
    let author = await DB_author.get_author_info(req.params.author_id);
    let result=await booklist.getBookByAuthor(author[0].AUTHOR_NAME);
    res.render('Author/Author_details.ejs', {
        user: req.user,
        author: author,
        author_following: author_following,
        author_book_count: author_book_count,
        book:result,
        author_follower:author_follower
    })

})


module.exports=router;