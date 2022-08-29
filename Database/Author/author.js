const config = require('../Config');
const oracledb = require('oracledb');
const { retry } = require('async');
const database = new config.Database_class();

async function add_author(binds)
{
    let sql=`BEGIN
             add_author(:full_name,:address,:About,:Date_of_birth,:gender,:image_url);
             END;
             `;

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
module.exports={add_author,get_author_info,author_book_count,all_author_book_count,all_author_follower_count}