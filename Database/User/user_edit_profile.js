const config = require('../Config');
const oracledb = require('oracledb');
const { retry } = require('async');
const database = new config.Database_class();

async function edit_user_info(bind1,bind2)
{  console.log('bleh');
    let sql=`UPDATE USERS
       SET FULL_NAME=:fullname, IMAGE_URL=:image ,BIO=:bio, GENDER=:gender,ADDRESS=:address
       WHERE USER_ID=:user_id`
    let result=(await(database.execute(sql,bind1)));
    let sql1=`UPDATE READER
    SET USER_NAME=:username 
    WHERE USER_ID=:user_id`
    
    return (await(database.execute(sql1,bind2)));
}

module.exports={
    edit_user_info
}