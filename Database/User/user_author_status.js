const config = require('../Config');
const oracledb = require('oracledb');
const { retry } = require('async');
const database = new config.Database_class();


async function user_following_author(binds)
{   
    let sql=`SELECT COUNT(*) AS COUNT FROM FOLLOW_AUTHOR WHERE USER_ID=:user_id and AUTHOR_ID=:author_id`
    return (await database.execute(sql,binds)).rows;
}
async function author_follower_count(binds)
{
    let sql=`SELECT COUNT(*) AS COUNT FROM FOLLOW_AUTHOR WHERE AUTHOR_ID=:author_id`
    return (await database.execute(sql,binds)).rows;
}
async function user_following_count(binds)
{
    let sql=`SELECT COUNT(*) AS COUNT FROM FOLLOW_AUTHOR WHERE USER_ID=:user_id`
    return (await database.execute(sql,binds)).rows;
}
async function user_following_allauthor(binds)
{
    let sql=`SELECT U.FULL_NAME AS AUTHOR_NAME,U.USER_ID AS AUTHOR_ID,U.DATE_OF_BIRTH,U.ADDRESS,U.IMAGE_URL,U.GENDER,A.ABOUT
    FROM AUTHOR A JOIN USERS U ON(U.USER_ID=A.USER_ID) WHERE A.USER_ID IN (SELECT AUTHOR_ID FROM FOLLOW_AUTHOR WHERE USER_ID=:user_id)`
    return (await database.execute(sql,binds)).rows;
   
}
async function follow_author(binds)
{   let sql1=`SELECT COUNT(*) AS COUNT FROM FOLLOW_AUTHOR WHERE USER_ID=:user_id and AUTHOR_ID=:author_id`
    let result=(await database.execute(sql1,{user_id:binds.user_id,author_id:binds.author_id})).rows;
    console.log("bleh  "+result[0].COUNT);
    if(result[0].COUNT>0)
    {
        let sql=`DELETE FROM FOLLOW_AUTHOR WHERE USER_ID=:user_id and AUTHOR_ID=:author_id`
        return (await database.execute(sql,{user_id:binds.user_id,author_id:binds.author_id}));
    }
    else{
    let sql=`INSERT INTO FOLLOW_AUTHOR VALUES(:user_id,:author_id,TO_DATE(:date_added,\'YYYY-MM-DD\'))`
    return (await database.execute(sql,binds));
    }
}

module.exports={user_following_author,user_following_allauthor,follow_author,author_follower_count,user_following_count}