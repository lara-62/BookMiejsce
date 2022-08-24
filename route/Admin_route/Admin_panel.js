const express=require('express');
const router =express.Router();
const books=require('../../Database/Books/books')

router.get('/Home',async(req,res)=>
{
    try{
        let results=await books.get_all_books()
        res.render('Admin/admin_home.ejs',{
            msg:results
        })
           
            
        
        
       
    }  
    catch(err) 
    {
        console.log(err);
    } 
})


module.exports=router