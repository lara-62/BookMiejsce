const express=require('express')
const router=express.Router();
const {verify}=require('../../middleware/user-verification')
const edituser=require('../../Database/User/user_edit_profile')

router.post('/update_userinfo',verify,async(req,res)=>
{
    console.log(req.body);

    let cover;
    let uploadpath;
    let errors=[];
     console.log(req.files);
    if(!req.files || Object.keys(req.files).length==0)
    {
        errors.push('no file uploaded');
        console.log('one');
       
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
             console.log('two');
        }
      else
      {
        
           
        
        let fullname=req.body.fullname;
        let username=req.body.username;
        let gender=req.body.gender;
        let address=req.body.address
        let bio=req.body.bio;
        let image=cover.name;
        let bind1={
          fullname:fullname,
          image:image,
          bio:bio,
          gender:gender,
          address:address,
          user_id:req.user.USER_ID
        }
       let bind2=
       {
           username:username,
           user_id:req.user.USER_ID
       }
       console.log('okay');
        edituser.edit_user_info(bind1,bind2)
           
            console.log(cover)
            
      }
        
    })

 
   }
   res.render('edit-profile.ejs',{
    user:req.user
   })

 
})

module.exports=router;