var oracledb = require('oracledb');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../../Database/Config.js');
const { use } = require('../../route/users/user_profile.js');
let errors=[];
async function post(req, res, next) {
     errors = [];
     if(req.body.password===req.body.conpassword)
    {
    var user = {
        email: req.body.email
    };

    oracledb.getConnection(config.database,async(err,con)=>
    {
        if(err)
        {
            console.log(err+ "     ki bujhlam");
        }
        else
        {
           let sql_block='BEGIN '+
                        'uniquemail(:email,:result);'+
            'END;'
            let result;
          try
          {result= (await con.execute(sql_block,{email:user.email,result: {
            dir: oracledb.BIND_OUT, 
            type: oracledb.VARCHAR2
        }})).outBinds;
    } 
    catch(err)
    {
        console.log(bleh);
    }
          console.log(result);
           if(result.result==='email is already exist')
           {  
            console.log('bujhlam');
            errors.push('Email  already exists')
            res.render('Sign_up.ejs',{msg: errors})
           }
           else
           {
            var unhashedPassword = req.body.password;
            console.log(unhashedPassword);
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    return next(err);
                }
        
                bcrypt.hash(unhashedPassword, salt, function(err, hash) {
                    if (err) {
                        return next(err);
                    }
        
                    user.hashedPassword = hash;
        
                    insertUser(req.body, function(err, user1) {
                        var payload;
        
                        if (err) {
                            return next(err+"     ki bujhlam na1" );
                        }
                        console.log(user1.id);
                        oracledb.getConnection(
                            config.database,async(err,con)=>
                            {
                                if(err)
                                {
                                    console.log(err+ "     ki bujhlam na2");
                                }
                                else
                                {   var date1=new Date();
                                    date1=date1.toISOString().slice(0,10);
                                    
                                    let sql= 'insert into reader values(:user_id,:username,:password, TO_DATE(:joindate,\'YYYY-MM-DD\'))';
                                    let binds=
                                    {
                                        user_id:user1.id,
                                        username:req.body.username,
                                        password:user.hashedPassword,
                                        joindate:date1
                                    }
                                   
                                        con.execute(sql,binds,{autoCommit:true},async(err)=>
                                        {
                                              if(err)
                                              {  console.log(err+"     ki bujhlam na3")
                                                
                                              }
                                              else
                                              {
                                                payload = {
                                                    user_id:user1.user_id,
                                                    sub: user1.email,
                                                    role: user1.role
                                                };
                                              if(errors.length==0){
                                                errors.push("Registration successful!")
                                                res.render('Home.ejs', { msg:errors ,error:[]
                                            
                                                })
                                            }
                                              }
                                        });
                                   
                                    
                                }
                            }
                         ) 
                       
                    });
                });
            });
           }
        }
    })
     
  
}

else
{
    errors.push("use the same password to confirm!")
    res.render('Sign_up.ejs',{msg: errors})
}


}

module.exports.post = post;

 async function  insertUser(user, cb) {
    console.log(user.email.toLowerCase()+" "+user.fullname+" "+user.Dob+" "+user.address+" "+user.gender)
    let sql='INSERT INTO USERS (EMAIL,FULL_NAME,DATE_OF_BIRTH,ADDRESS,GENDER,ROLE) VALUES (:email,:fullname,TO_DATE(:dob,\'YYYY-MM-DD\'),:Address,:gender ,:base) '+
         'Returning user_id ,email ,role into :rid,:remail,:rrole'; 
  
    let binds=    {
        email: user.email,
        fullname:user.fullname,
        dob:user.Dob,
        Address:user.address,
        gender:user.gender,
        base:'\'BASE\'',
        rid: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT
        },
        remail: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT
        },
        rrole: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT
        }

    }
    oracledb.getConnection(
        config.database,
        function(err, connection){
            if (err) {
                console.log("Ki hoilo jani na")
                return cb(err);
            }

            connection.execute(sql,binds,
                {
                    autoCommit: true
                },
                function(err, results){
                    if (err) {
                        console.log('okaaaaaaayy');
                        connection.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return cb(err);
                    }

                    cb(null, {
                        id: results.outBinds.rid[0],
                        email: results.outBinds.remail[0],
                        role: results.outBinds.rrole[0]
                    });

                    connection.release(function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                });
        }
    );
}