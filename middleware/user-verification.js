require('dotenv').config();
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const DB_user=require('../controller/user/get_user');
const { jwtSecretKey } = require('../Database/Config');



 async function verify(req,res,next){
    const token=req.cookies.auth
    let error=[];
    error.push('Access denied')
    console.log("         "+token+"       ")
    if(!token) return res.render('Home',{
        msg:[],
        error:error
    });
   
    try{
        const verified = jwt.verify(token,jwtSecretKey);
        console.log(verified);
        console.log(verified.user_id,verified.sub);
        req.user=  await DB_user.getUserById(verified.user_id);
        console.log(req.user);
        next();
        
        
        

    }catch(err){
        console.log(err);
        res.status(400).send('Invalid Token');
    }
    
}
module.exports={
    verify
}