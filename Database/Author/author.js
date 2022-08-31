const config = require('../Config');
const oracledb = require('oracledb');
const { retry } = require('async');
const database = new config.Database_class();

async function add_author(binds)
{
    let sql=`BEGIN
             add_author(:full_name,:address,:About,TO_DATE(:Date_of_birth,\'YYYY-MM-DD\'),:gender,:image_url);
             END;
             `;

    return await database.execute(sql,binds);
}
async function update_author_email(binds)
{
  let sql=`UPDATE USERS
       SET EMAIL=:email
       WHERE USER_ID=:userid`
  return await database.execute(sql,binds);

}
async function update_author_bio(binds)
{
  let sql=`UPDATE USERS
       SET BIO=:bio
       WHERE USER_ID=:userid`
  return await database.execute(sql,binds);
}
async function update_author_Dob(binds)
{
  let sql=`UPDATE USERS
       SET DATE_OF_BIRTH=TO_DATE(:dob,'YYYY-MM-DD')
       WHERE USER_ID=:userid`
  return await database.execute(sql,binds);
}
async function update_author_About(binds)
{
  let sql=`UPDATE AUTHOR
       SET ABOUT=:about
       WHERE USER_ID=:userid`
  return await database.execute(sql,binds);
}
async function update_author_info(binds)
{
    let sql=`UPDATE USERS
    SET FULL_NAME=:fullname,GENDER=:gender,ADDRESS=:address
    WHERE USER_ID=:userid`
    return await database.execute(sql,binds);
}
async function get_author_info(author_id)
{
  let sql=`SELECT U.FULL_NAME AS AUTHOR_NAME,U.USER_ID,U.DATE_OF_BIRTH,U.ADDRESS,U.IMAGE_URL,U.GENDER,A.ABOUT
  FROM AUTHOR A JOIN USERS U ON(U.USER_ID=A.USER_ID) WHERE A.USER_ID=:author_id`
  let binds={
    author_id:author_id
  }
  return (await database.execute(sql,binds)).rows;
}
async function get_author_infoBYName(authorname)
{
  let sql=`SELECT U.FULL_NAME AS AUTHOR_NAME,U.USER_ID,U.DATE_OF_BIRTH,U.BIO,U.EMAIL,U.ADDRESS,U.IMAGE_URL,U.GENDER,A.ABOUT
  FROM AUTHOR A JOIN USERS U ON(U.USER_ID=A.USER_ID) WHERE U.FULL_NAME=:authorname`
  let binds={
    authorname:authorname
  }
  return (await database.execute(sql,binds)).rows;
}
async function author_book_count(author_id)
{
    let sql=`SELECT COUNT(*) AS COUNT FROM WRITES WHERE USER_ID=:author_id`;
    let binds={
        author_id:author_id
    }
    return (await database.execute(sql,binds)).rows; 
}
async function all_author_book_count()
{
   let sql=`SELECT COUNT(*) AS COUNT, USER_ID AS AUTHOR_ID FROM WRITES GROUP BY USER_ID`;
   return (await database.execute(sql,{})).rows; 
}
async function all_author_follower_count()
{
  let sql=`SELECT COUNT(*) AS COUNT, AUTHOR_ID FROM FOLLOW_AUTHOR GROUP BY AUTHOR_ID`;
  return (await database.execute(sql,{})).rows; 
}
module.exports={update_author_bio,update_author_email,update_author_Dob,update_author_About,update_author_info,add_author,get_author_info,author_book_count,all_author_book_count,all_author_follower_count,get_author_infoBYName}