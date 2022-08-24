const { json } = require('body-parser');
const express=require('express');
const { object } = require('webidl-conversions');
const {verify}=require('../../middleware/user-verification')
const bookself=require('../../Database/Books/addToshelf')
const router=express.Router();
const booklist=require('../../Database/Books/books')




router.post('/add_shelve/:book_id',verify,async(req,res)=>
{    const bookbutton=req.body.bookbutton.toLowerCase();
    console.log(bookbutton);
    let id=req.params.book_id
    console.log(req.params)
    let binds={
        
        userid:req.user.USER_ID,
        bookid:id
    } 
    if(bookbutton==='currently reading')
    {
        
        bookself.Reading(binds)

    }
    else if(bookbutton==='read')
    {
        bookself.Read(binds)
    }
    else
    {
        bookself.Willread(binds)
    }
    res.redirect('/Book_detail/'+req.params.book_id);
   
})







module.exports=router;