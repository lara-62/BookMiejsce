const config = require('../Config');
const oracledb = require('oracledb');
const database = new config.Database_class();

async function add_review(binds)
{
    let sql='INSERT INTO REVIEW(REVIEW_BODY,DATE_ADDED,USER_ID,BOOK_ID) VALUES(:review_body,TO_DATE(:date_added,\'YYYY-MM-DD\'),:user_id,:book_id)';
    return (await database.execute(sql,binds));
}
async function add_like(binds)
{   let sql1=`SELECT COUNT(*) as count FROM LIKES_ON_REVIEW WHERE USER_ID=:user_id and REVIEW_ID=:review_id`
  let result= (await database.execute(sql1,{user_id:binds.user_id,review_id:binds.review_id})).rows;
    if(result[0].COUNT==0){
    let sql=`INSERT INTO LIKES_ON_REVIEW VALUES(:user_id,:review_id,TO_DATE(:date_added,\'YYYY-MM-DD\'))`
    return (await database.execute(sql,binds));
    }
}
async function add_comment(binds)
{
    let sql='INSERT INTO COMMENT_ON_REVIEW(COMMENT_BODY,DATE_ADDED,REVIEW_ID,USER_ID) VALUES(:comment_body,TO_DATE(:date_added,\'YYYY-MM-DD\'),:review_id,:user_id)';
    return (await database.execute(sql,binds));
}
async function get_review_info_of_a_book(book_id)
{
   let sql=`SELECT r.REVIEW_ID,r.REVIEW_BODY,r.DATE_ADDED,r.DATE_UPDATED,r.RATING, u.IMAGE_URL,u.USER_ID,re.USER_NAME FROM REVIEW r JOIN USERS u ON(r.USER_ID=u.USER_ID) JOIN READER re ON(r.USER_ID=re.USER_ID) WHERE r.BOOK_ID=:book_id`;
   let binds={
    book_id:book_id
   }
   return (await database.execute(sql,binds)).rows;
}
async function review_count(book_id)
{
    let sql=`SELECT COUNT(*) as count FROM REVIEW WHERE BOOK_ID=:book_id`
    let binds={
        book_id:book_id
    }
    return (await database.execute(sql,binds)).rows;
}
async function like_count()
{
   let sql=`SELECT COUNT(*) as count,REVIEW_ID FROM LIKES_ON_REVIEW 
   GROUP BY REVIEW_ID`
   
   return (await database.execute(sql,{})).rows;
}
async function comment_count()
{
   let sql=`SELECT COUNT(*) as count,REVIEW_ID FROM COMMENT_ON_REVIEW 
   GROUP BY REVIEW_ID`
   
   return (await database.execute(sql,{})).rows;
}
async function all_comments_of_books(book_id)
{
    let sql=`SELECT c.REPLY_ID AS COMMENT_ID ,c.COMMENT_BODY,c.DATE_ADDED,c.DATE_UPDATED,c.REVIEW_ID, u.IMAGE_URL,u.USER_ID,re.USER_NAME FROM COMMENT_ON_REVIEW c JOIN USERS u ON(c.USER_ID=u.USER_ID) JOIN READER re ON(c.USER_ID=re.USER_ID) JOIN REVIEW r ON(r.REVIEW_ID=c.REVIEW_ID) WHERE r.BOOK_ID=:book_id`;
   let binds={
    book_id:book_id
   }
   return (await database.execute(sql,binds)).rows;
}
module.exports={add_review,get_review_info_of_a_book,review_count,add_like,like_count,add_comment,all_comments_of_books,comment_count}