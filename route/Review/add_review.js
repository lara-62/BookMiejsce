const express=require('express');
const {verify}=require('../../middleware/user-verification')
const review=require('../../Database/Books/review')
const router=express.Router();


router.post('/review/:book_id',verify,async(req,res)=>
{   let bookid=req.params.book_id;
    console.log(req.params);
    
    let userid=req.user.USER_ID;
    let review_body=req.body.review_body;
    console.log(review_body);
    var date1=new Date();
    date1=date1.toISOString().slice(0,10);
    let binds={
        review_body:review_body,
        date_added:date1,
        user_id:userid,
        book_id:bookid
    }

   review.add_review(binds);
  res.redirect('/Book_detail/'+req.params.book_id);


})
router.post('/review_like/:review_id/:book_id',verify,async(req,res)=>{
    var date1=new Date();
    date1=date1.toISOString().slice(0,10);
    let review_id=req.params.review_id;
    let user_id=req.user.USER_ID;
    let binds={
        user_id:user_id,
        review_id:review_id,
        date_added:date1

    }
    review.add_like(binds)
    console.log(req.params);
    res.redirect('/Book_detail/'+req.params.book_id);

})
router.post('/review_comment/:review_id/:book_id',verify,async(req,res)=>{
    var date1=new Date();
    date1=date1.toISOString().slice(0,10);
    let review_id=req.params.review_id;
    let user_id=req.user.USER_ID;
    let comment_body=req.body.comment_body;
    let binds={
        comment_body:comment_body,
        date_added:date1,
        review_id:review_id,
        user_id:user_id,
    }
    review.add_comment(binds)
    console.log(req.params);
    res.redirect('/Book_detail/'+req.params.book_id);

})

router.get('/review/:book_id',verify,async(req,res)=>{

    let review_info=review.get_review_info_of_a_book(req.params.book_id);

})

module.exports=router;