const express=require('express');
const router=express.Router();
const author=require('../../Database/Author/author')

router.get('/add_Author',(req,res)=>
{
    res.render('Author/add_author.ejs',{
        msg:[]
    });
})
router.post('/add_Author',(req,res)=>
{
    let full_name=req.body.fullname.toLowerCase();
    let address=req.body.address;
    let About=req.body.About;
    let Date_of_birth=req.body.Dob;
    let gender=req.body.gender;
    let cover;
    let uploadpath;
    let errors=[];
    if(!req.files || Object.keys(req.files).length==0)
    {
        errors.push('no file uploaded');
        res.render('Author/add_author.ejs',{
            msg:errors
        })
    }
    else
    {
    cover=req.files.cover;
    
    uploadpath=__dirname+'/../../public/image/user/'+cover.name;
    cover.mv(uploadpath,(err)=>
    {
        if(err)
        {   console.log(uploadpath);
             errors.push('file upload failed');
             res.render('Author/add_author.ejs',{
                msg:errors
            })
        }
      else
      {
            try{
               let binds={
                full_name:full_name,
                address:address,
                About:About,
                Date_of_birth:Date_of_birth,
                gender:gender,
                image_url:cover.name
               }
             author.add_author(binds);
             res.redirect('/Admin/Home')
              
              
            }
            catch(err)
            {
               console.log(err);
               errors.push('Book adding failed')
               res.render('Author/add_author.ejs',{
                msg:errors
            })
            }
            console.log(cover)
            
      }
        
    })

 
   }


})
module.exports=router;