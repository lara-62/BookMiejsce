const config = require('../Config');
const oracledb = require('oracledb');
const { retry } = require('async');
const database = new config.Database_class();

async function user_review_count(binds){
    let sql=`SELECT COUNT(*) AS COUNT FROM REVIEW WHERE USER_ID=:user_id`;
    return (await(database.execute(sql,binds))).rows;
}

async function get_user_byNAME(binds)
{
    let sql=`SELECT U.USER_ID,U.FULL_NAME,U.DATE_OF_BIRTH,U.ADDRESS,U.IMAGE_URL,U.GENDER,U.BIO,U.ROLE,U.EMAIL,R.USER_NAME,R.JOINING_DATE
     FROM USERS U JOIN READER R ON(U.USER_ID=R.USER_ID) WHERE R.USER_NAME LIKE :username`;
    return (await(database.execute(sql,binds))).rows;

}
async function get_user_byID(binds)
{
    let sql=`SELECT U.USER_ID,U.FULL_NAME,U.DATE_OF_BIRTH,U.ADDRESS,U.IMAGE_URL,U.GENDER,U.BIO,U.ROLE,U.EMAIL,R.USER_NAME,R.JOINING_DATE
     FROM USERS U JOIN READER R ON(U.USER_ID=R.USER_ID) WHERE R.USER_ID LIKE :userid`;
    return (await(database.execute(sql,binds))).rows;

}
async function follow_friend(binds)
{   
   let sql=`BEGIN 
            FOLLOWFRIEND(:userid1,:userid2,TO_DATE(:date_added,\'YYYY-MM-DD\'));
            END;`
   return (await(database.execute(sql,binds))).rows;

    
}
async function friend_count(binds)
{
    let sql=`SELECT COUNT(*) AS COUNT FROM FOLLOW_READER WHERE USER2_ID=:userid`
    return (await(database.execute(sql,binds))).rows;
}
async function is_friend_of(binds)
{
    let sql=`SELECT COUNT(*) AS COUNT FROM FOLLOW_READER WHERE USER1_ID=:userid1 and USER2_ID=:userid2`
    return (await(database.execute(sql,binds))).rows;
}

async function get_your_friend(binds)
{
    let sql=`SELECT U.USER_ID,U.FULL_NAME,U.DATE_OF_BIRTH,U.ADDRESS,U.IMAGE_URL,U.GENDER,U.BIO,U.ROLE,U.EMAIL,R.USER_NAME,R.JOINING_DATE
     FROM USERS U JOIN READER R ON(U.USER_ID=R.USER_ID) WHERE U.USER_ID IN( SELECT user2_id from FOLLOW_READER WHERE USER1_ID=:userid1)`;
     return (await(database.execute(sql,binds))).rows;
}
module.exports={
    user_review_count,get_user_byNAME,get_user_byID,follow_friend,friend_count,is_friend_of,get_your_friend
}