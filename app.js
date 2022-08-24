//Builtin 
require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const session = require('express-session');
const morgan=require('morgan');
const jwt=require('jsonwebtoken');
const cookieParser = require("cookie-parser");
var cookie = require('cookie');
const fileupload=require('express-fileupload');



//custom
// const oracleRouter=require('./route/oracleCon.js');
const Sign_upRouter=require('./route/signup_route');
const index=require('./route/index')
const auth=require('./route/auth/signup-auth.js')
const user=require('./route/users/user.js');
const user_profile=require('./route/users/user_profile');
const authorize=require('./middleware/auth');
const { object } = require('webidl-conversions');
const book_upload=require('./route/Admin_route/book_upload');
const book=require('./route/Admin_route/Admin_panel')
const book_list=require('./route/Books/Book-list');
const bookshelve=require('./route/Books/add_bookshelve');
const review=require('./route/Review/add_review')
//var oracleDbStore = require('express-oracle-session')(session);
const port=process.env.port|| 3000;



const app=express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json())
app.use(fileupload());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser());

//app.use('/oracle-con',oracleRouter);
 //oracleRouter.startup();
app.use(index)
app.use('/lets',Sign_upRouter);
app.use(morgan('combined'));

app.use('/api',user)
app.use('/',user_profile)
app.use('/',book_upload)
app.use('/Admin',book)
app.use('/',book_list)
app.use('/',bookshelve);
app.use('/',review)



app.get('/',function(req,res)
{   let msg=[];  
   res.render('Home',{ msg:msg,error:[]})

   
})



app.listen(port,function()
{
    console.log('server is running in port 3000');
})
//url: http://localhost:3000/oracle-con/reg-std

