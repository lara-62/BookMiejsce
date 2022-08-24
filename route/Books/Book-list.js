const express=require('express')
const  router=express.Router()
const booklist=require('../../Database/Books/books')
const {verify}=require('../../middleware/user-verification')
const review=require('../../Database/Books/review')
const { each } = require('async')

router.post('/Book-list',verify,async(req,res)=>{
    let msg=[]
    const bookname=req.body.search.toLowerCase();
    console.log(bookname);
    let result;
    if(bookname==='all')
    {
      result=await booklist.get_all_books()
    }
    else
    {
      result=await booklist.getBookByName(bookname);
    }

    if(result.length==0)
    {
      msg.push('There is no book by this name');
    }
    console.log(result)
    console.log(req.user);
    res.render('Books/Book_list.ejs',
    {
        user:req.user,
        msg:msg,
        book:result
    });
    
})
router.get('/Book_detail/:id',verify,async(req,res)=>{
  console.log(req.params.id);
  let result=await booklist.getBookDetails(req.params.id);
  let people=await booklist.number_of_peopleReadingtheBook(req.params.id)
  let review_info=await review.get_review_info_of_a_book(req.params.id);
  let review_count= await review.review_count(req.params.id)
  let likes=await review.like_count();
  let comment=await  review.all_comments_of_books(req.params.id);
  let comment_count=await review.comment_count();
  console.log(people);
  console.log(review_info);
  console.log(review_count);
  console.log(comment)
  res.render('Books/book_details', {
    user:req.user,
    book:result,
    people:people,
    review_info:review_info,
    review_count:review_count,
    likes:likes,
    comment:comment,
    comment_count:comment_count
})
  console.log(result);
})

router.post('/genre',verify,async(req,res)=>
{
  let msg=[]
  const genrename=req.body.genre_name.toLowerCase();
 
  let result=await booklist.getBookBygenre(genrename);
  if(result.length==0)
  {
    msg.push('There is no book by this genre');
  }
  console.log(result)
  console.log(req.user);
  res.render('Books/Book_list.ejs',
  {
      user:req.user,
      msg:msg,
      book:result
  });
})
router.post('/author',verify,async(req,res)=>
{
  let msg=[]
  const authorname=req.body.author_name.toLowerCase();
 
  let result=await booklist.getBookByAuthor(authorname);
  if(result.length==0)
  {
    msg.push('There is no book by this Author');
  }
  console.log(result)
  console.log(req.user);
  res.render('Books/Book_list.ejs',
  {
      user:req.user,
      msg:msg,
      book:result
  });
})
module.exports=router;