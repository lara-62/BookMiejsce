const config = require('../Config');
const oracledb = require('oracledb');
const { retry } = require('async');
const database = new config.Database_class();


async  function user_reading(binds)
{
   let sql=`SELECT COUNT(*) AS COUNT FROM READING WHERE USER_ID=:user_id and BOOK_ID=:book_id`
   return (await database.execute(sql,binds)).rows;
}
async function user_hasread(binds)
{
    let sql=`SELECT COUNT(*) AS COUNT FROM HAS_READ WHERE USER_ID=:user_id and BOOK_ID=:book_id`
    return (await database.execute(sql,binds)).rows;
}
async function user_willread(binds)
{
    let sql=`SELECT COUNT(*) AS COUNT FROM WILL_READ WHERE USER_ID=:user_id and BOOK_ID=:book_id`
    return (await database.execute(sql,binds)).rows;
}

module.exports={user_hasread,user_reading,user_willread}