require('dotenv').config();
const jwt = require('jsonwebtoken');

const DB_user=require('../controller/user/get_user');
const { jwtSecretKey } = require('../Database/Config');



async function verify(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token,jwtSecretKey, { expiresIn: '1h' });
        console.log(verified.id)
        req.user =await DB_user.getUserById(verified.id);
        next();

    }catch(err){
        res.status(400).send('Invalid Token');
    }
}
module.exports={
    verify
}