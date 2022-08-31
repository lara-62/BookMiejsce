const config = require('../Config');
const oracledb = require('oracledb');
const { retry } = require('async');
const database = new config.Database_class();


async function Your_friends_are_reading(binds)
{
   let sql=`SELECT b.BOOK_ID AS BOOK_ID, TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME,
   p.PUBLISHER_NAME,p.PUBLISHER_ID,u.USER_ID 
    FROM BOOKS b JOIN
    WRITES w ON(b.BOOK_ID=w.BOOK_ID)
   JOIN USERS u ON (w.USER_ID=u.USER_ID)
   JOIN PUBLISHER p
   ON(p.PUBLISHER_ID=b.PUBLISHER_ID)
   WHERE B.BOOK_ID IN(SELECT DISTINCT BOOK_ID FROM ((SELECT DISTINCT BOOK_ID FROM HAS_READ WHERE USER_ID IN (SELECT USER2_ID FROM FOLLOW_READER WHERE USER1_ID=:user_id) AND USER_ID<>:user_id)UNION
   (SELECT DISTINCT BOOK_ID FROM WILL_READ WHERE USER_ID IN (SELECT USER2_ID FROM FOLLOW_READER WHERE USER1_ID=:user_id) AND USER_ID<>:user_id) UNION
   (SELECT DISTINCT BOOK_ID FROM READING WHERE USER_ID IN (SELECT USER2_ID FROM FOLLOW_READER WHERE USER1_ID=:user_id) AND USER_ID<>:user_id)))`
   return (await database.execute(sql,binds)).rows;
   
}
async function books_of_Author_YouareFollowing(binds)
{
    let sql=`SELECT b.BOOK_ID AS BOOK_ID, TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME,
    p.PUBLISHER_NAME,p.PUBLISHER_ID,u.USER_ID 
     FROM BOOKS b JOIN
     WRITES w ON(b.BOOK_ID=w.BOOK_ID)
    JOIN USERS u ON (w.USER_ID=u.USER_ID)
    JOIN PUBLISHER p
    ON(p.PUBLISHER_ID=b.PUBLISHER_ID)
    WHERE B.BOOK_ID IN( (SELECT BOOK_ID FROM WRITES WHERE USER_ID IN ( SELECT AUTHOR_ID FROM FOLLOW_AUTHOR WHERE USER_ID=:user_id)) MINUS (SELECT BOOK_ID FROM (
		
		((SELECT DISTINCT BOOK_ID FROM HAS_READ WHERE USER_ID=:user_id)UNION
    (SELECT DISTINCT BOOK_ID FROM WILL_READ WHERE USER_ID=:user_id) UNION
    (SELECT DISTINCT BOOK_ID FROM READING WHERE USER_ID=:user_id)))))`
    return (await database.execute(sql,binds)).rows;
}
module.exports={Your_friends_are_reading,books_of_Author_YouareFollowing}