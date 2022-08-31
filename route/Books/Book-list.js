const express=require('express')
const  router=express.Router()
const booklist=require('../../Database/Books/books')
const {verify}=require('../../middleware/user-verification')
const review=require('../../Database/Books/review')
const DB_bookinfo=require('../../Database/Books/addToshelf')
const DB_author=require('../../Database/Author/author')
const DB_user=require('../../Database/User/user_Reading_status')
const DB_author_follow=require('../../Database/User/user_author_status')
const DB_recommend=require('../../Database/Recommendation/recommendation')
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
    let friend_recommend=await DB_recommend.Your_friends_are_reading({user_id:req.user.USER_ID})
    console.log(result)
    console.log(req.user);
    res.render('Books/Book_list.ejs',
    {
        user:req.user,
        msg:msg,
        book:result
    });
    
})
router.get('/friends_book',verify,async(req,res)=>
{
  let msg=[]
  let friend_recommend=await DB_recommend.Your_friends_are_reading({user_id:req.user.USER_ID})
  if(friend_recommend.length<1)
  {
    msg.push('There is no more book');
  }
  res.render('Books/Book_list.ejs',
  {
      user:req.user,
      msg:msg,
      book:friend_recommend
  });
})
router.get('/authors_book',verify,async(req,res)=>
{
  let msg=[]
  let author_recommend=await DB_recommend.books_of_Author_YouareFollowing({user_id:req.user.USER_ID})
  if(author_recommend.length<1)
  {
    msg.push('There is no more book');
  }
  res.render('Books/Book_list.ejs',
  {
      user:req.user,
      msg:msg,
      book:author_recommend
  });
})
router.get('/Book_detail/:id',verify,async(req,res)=>{
  console.log(req.params.id);
  let result=await booklist.getBookDetails(req.params.id);
  let genre=await booklist.genre_of_book(req.params.id);
  let people=await booklist.number_of_peopleReadingtheBook(req.params.id)
  let review_info=await review.get_review_info_of_a_book(req.params.id);
  let review_count= await review.review_count(req.params.id)
  let likes=await review.like_count();
  let comment=await  review.all_comments_of_books(req.params.id);
  let comment_count=await review.comment_count();
  let author=await DB_author.get_author_info(result[0].USER_ID);
  let author_book_count=await DB_author.author_book_count(result[0].USER_ID);
  let binds={
    user_id:req.user.USER_ID,
    book_id:req.params.id
  }
  let user_Reading=await DB_user.user_reading(binds);
  let user_hasread=await DB_user.user_hasread(binds);
  let user_willread=await DB_user.user_willread(binds);
  let bind={
      user_id:req.user.USER_ID,
      author_id:result[0].USER_ID
  }
  let author_following=await DB_author_follow.user_following_author(bind)
  let author_follower=await DB_author_follow.author_follower_count({author_id:result[0].USER_ID})
  console.log(author_following[0].COUNT);
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
    comment_count:comment_count,
    author:author,
    author_book_count:author_book_count,
    genre:genre,
    user_Reading:user_Reading,
    user_hasread:user_hasread,
    user_willread:user_willread,
    author_following:author_following,
    author_follower:author_follower
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
router.get('/your_book',verify,async(req,res)=>{

  let hasread=await DB_bookinfo.gethasreadbooks(req.user.USER_ID)
  let willread=await DB_bookinfo.getwillreadbooks(req.user.USER_ID)
  let Reading=await DB_bookinfo.getreadingbooks(req.user.USER_ID)
  let review1=await review.get_user_review({user_id:req.user.USER_ID})
  console.log(Reading);
  console.log(willread);
  console.log(hasread);
    res.render('Books/my_books.ejs',
    {
      user:req.user,
      hasread:hasread,
      Reading:Reading,
      willread:willread,
      review:review1
    });

})
router.get('/Reading_book',verify,async(req,res)=>{

 
  let Reading=await DB_bookinfo.getreadingbooks(req.user.USER_ID)
  let review1=await review.get_user_review({user_id:req.user.USER_ID})
  console.log(Reading);
 
    res.render('Books/my_books.ejs',
    {
      user:req.user,
      hasread:[],
      Reading:Reading,
      willread:[],
      review:review1
    });

})
router.get('/hasread_book',verify,async(req,res)=>{

  let hasread=await DB_bookinfo.gethasreadbooks(req.user.USER_ID)
  let review1=await review.get_user_review({user_id:req.user.USER_ID})
  
 
  console.log(hasread);
    res.render('Books/my_books.ejs',
    {
      user:req.user,
      hasread:hasread,
      Reading:[],
      willread:[],
      review:review1
    });

})
router.get('/willread_book',verify,async(req,res)=>{

 
  let willread=await DB_bookinfo.getwillreadbooks(req.user.USER_ID)
  let review1=await review.get_user_review({user_id:req.user.USER_ID})
  
  

  console.log(willread);
 
    res.render('Books/my_books.ejs',
    {
      user:req.user,
      hasread:[],
      Reading:[],
      willread:willread,
      review:review1
    });

})



module.exports=router;