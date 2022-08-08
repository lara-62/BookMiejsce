//Builtin 
require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const session = require('express-session');
const morgan=require('morgan');
const jwt=require('jsonwebtoken');


//custom
// const oracleRouter=require('./route/oracleCon.js');
const Sign_upRouter=require('./route/signup_route');
const index=require('./route/index')
const auth=require('./route/auth/signup-auth.js')
const user=require('./route/users/user.js');
const user_profile=require('./route/users/user_profile');
const authorize=require('./middleware/auth');
//var oracleDbStore = require('express-oracle-session')(session);
const port=process.env.port|| 3000;


const app=express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
//app.use('/oracle-con',oracleRouter);
 //oracleRouter.startup();
app.use(index)
app.use('/lets',Sign_upRouter);
// app.use(session({
//     secret:'I do not know what it is',
//     resave: false,
//     saveUninitialized:true
// }))
// // app.use(cors());
// // app.options('*',cors());

app.use(morgan('combined'));

app.use('/api',user)
app.use('/',user_profile)



app.get('/',function(req,res)
{   let msg=[];  
   res.render('Home',{ msg:msg,error:[]})
   
})

app.listen(port,function()
{
    console.log('server is running in port 3000');
})
//url: http://localhost:3000/oracle-con/reg-std