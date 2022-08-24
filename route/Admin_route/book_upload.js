const express=require('express');
const router=express.Router();
const books=require('../../Database/Books/books')
router.get('/upload_book',(req,res)=>
{
    res.render('Books/add_book.ejs',{
        msg:[]
    });
})
router.post('/upload_book',async(req,res)=>
{  

    let cover;
    let uploadpath;
    let errors=[];
    if(!req.files || Object.keys(req.files).length==0)
    {
        errors.push('no file uploaded');
        res.render('Books/add_book.ejs',{
            msg:errors
        })
    }
    else
    {
    cover=req.files.cover;
    
    uploadpath=__dirname+'/../../public/image/Books/'+cover.name;
    cover.mv(uploadpath,(err)=>
    {
        if(err)
        {   console.log(uploadpath);
             errors.push('file upload failed');
             res.render('Books/add_book.ejs',{
                msg:errors
            })
        }
      else
      {
            try{
               
             books.upload_book(res,req);
             res.redirect('/Admin/Home')
              
              
            }
            catch(err)
            {
               console.log(err);
               errors.push('Book adding failed')
               res.render('Books/add_book.ejs',{
                msg:errors
            })
            }
            console.log(cover)
            
      }
        
    })

 
   }

})

router.get('/add_book',(req,res)=>{
   res.redirect('/upload_book');
})
router.post('/add_book',(req,res)=>{
    res.redirect('/upload_book');
})
module.exports=router;