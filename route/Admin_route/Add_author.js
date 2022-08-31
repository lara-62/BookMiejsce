const express=require('express');
const router=express.Router();
const DB_author=require('../../Database/Author/author')
router.post('/edit_author',async(req,res)=>
{      
      const authorname=req.body.author_name.toLowerCase();
      let author = await DB_author.get_author_infoBYName(authorname);
      res.render('Admin/edit-author.ejs',{
        author:author
      });
})
router.post('/update_author/:author_id',async(req,res)=>{
    let binds={
        fullname:req.body.fullname,
        gender:req.body.gender,
        address:req.body.address,
        userid:req.params.author_id

    }
    await DB_author.update_author_info(binds)
    if(req.body.email!='')
    {
        await DB_author.update_author_email({email:req.body.email,userid:req.params.author_id})
    }
    if(req.body.bio!='')
    {
        await DB_author.update_author_bio({bio:req.body.bio,userid:req.params.author_id}) 
    }
    if(req.body.Dob!='')
    {
        await DB_author.update_author_Dob({dob:req.body.Dob,userid:req.params.author_id}) 
    }
    if(req.body.about!='')
    {
        await DB_author.update_author_About({about:req.body.about,userid:req.params.author_id})  
    }
    res.redirect('/Admin/Home')
    console.log(req.body);
})
router.get('/add_Author',(req,res)=>
{
    res.render('Author/add_author.ejs',{
        msg:[]
    });
})
router.post('/add_Author',(req,res)=>
{
    let full_name=req.body.fullname;
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