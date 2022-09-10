const config = require('../Config');
const oracledb = require('oracledb');
const { retry, select } = require('async');
const database = new config.Database_class();

async function Reading(binds)
{
     
    let sql = 'BEGIN' +
        ' CHECK_FOR_READING(:userid,:bookid,:dateadded); ' +
        'END;';
    var date1=new Date();
    date1=date1.toISOString().slice(0,10);
    let bind={
            userid:binds.userid,
            bookid:binds.bookid,
            dateadded:date1
            }
          return await database.execute(sql,bind);

}
async function Read(binds)
{
    let sql = 'BEGIN' +
        ' CHECK_FOR_HASREAD(:userid,:bookid,:dateadded); ' +
        'END;';
    var date1=new Date();
    date1=date1.toISOString().slice(0,10);
    let bind={
            userid:binds.userid,
            bookid:binds.bookid,
            dateadded:date1
            }
          return await database.execute(sql,bind);
}
async function Willread(binds)
{
    let sql = 'BEGIN' +
        ' CHECK_FOR_WILLREAD(:userid,:bookid,:dateadded); ' +
        'END;';
    var date1=new Date();
    date1=date1.toISOString().slice(0,10);
    let bind={
            userid:binds.userid,
            bookid:binds.bookid,
            dateadded:date1
            }
          return await database.execute(sql,bind);
}
async function getuserbookself(userid)
{
    let sql=' SELECT COUNT(*) as count'+ 
    ' FROM ( SELECT * from HAS_READ WHERE USER_ID=:user_id UNION SELECT * from READING WHERE USER_ID=:user_id UNION SELECT * FROM WILL_READ WHERE USER_ID=:user_id)'
    return (await database.execute(sql,{user_id:userid})).rows;
    
}
async function gethasreadbooks(user_id)
{
    let sql='SELECT b.BOOK_ID AS BOOK_ID, TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME,'+ 
    ' p.PUBLISHER_NAME ,p.PUBLISHER_ID,u.USER_ID ,h.DATE_ADDED'+
    ' FROM BOOKS b JOIN'+
    ' WRITES w ON(b.BOOK_ID=w.BOOK_ID)'+
    ' JOIN USERS u ON (w.USER_ID=u.USER_ID)'+
    // ' JOIN OF_GENRE of_g'+
    // ' ON (b.BOOK_ID=of_g.BOOK_ID)'+
    // ' JOIN GENRE g'+
    // ' ON(of_g.GENRE_ID=g.GENRE_ID)'+
    ' JOIN PUBLISHER p'+
    ' ON(p.PUBLISHER_ID=b.PUBLISHER_ID)'+
    '  JOIN HAS_READ  h'+
    ' ON(h.BOOK_ID=b.BOOK_ID AND h.USER_ID=:user_id)'
    let binds={
        user_id:user_id
    }
    return (await database.execute(sql,binds)).rows;
}
async function getreadingbooks(user_id)
{
    let sql='SELECT b.BOOK_ID AS BOOK_ID, TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME,'+ 
    ' p.PUBLISHER_NAME ,p.PUBLISHER_ID,u.USER_ID,h.DATE_ADDED'+
    ' FROM BOOKS b JOIN'+
    ' WRITES w ON(b.BOOK_ID=w.BOOK_ID)'+
    ' JOIN USERS u ON (w.USER_ID=u.USER_ID)'+
    // ' JOIN OF_GENRE of_g'+
    // ' ON (b.BOOK_ID=of_g.BOOK_ID)'+
    // ' JOIN GENRE g'+
    // ' ON(of_g.GENRE_ID=g.GENRE_ID)'+
    ' JOIN PUBLISHER p'+
    ' ON(p.PUBLISHER_ID=b.PUBLISHER_ID)'+
    ' JOIN READING  h'+
    ' ON(h.BOOK_ID=b.BOOK_ID AND h.USER_ID=:user_id)'
    let binds={
        user_id:user_id
    }
    return (await database.execute(sql,binds)).rows;
    
}
async function getwillreadbooks(user_id)
{
    let sql = 'SELECT DISTINCT b.BOOK_ID  AS BOOK_ID , TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME,' +
        ' p.PUBLISHER_NAME ,p.PUBLISHER_ID,u.USER_ID,h.DATE_ADDED' +
        ' FROM BOOKS b JOIN' +
        ' WRITES w ON(b.BOOK_ID=w.BOOK_ID)' +
        ' JOIN USERS u ON (w.USER_ID=u.USER_ID)' +
        // ' JOIN OF_GENRE of_g' +
        // ' ON (b.BOOK_ID=of_g.BOOK_ID)' +
        // ' JOIN GENRE g' +
        // ' ON(of_g.GENRE_ID=g.GENRE_ID)' +
        ' JOIN PUBLISHER p' +
        ' ON(p.PUBLISHER_ID=b.PUBLISHER_ID)' +
        '   JOIN WILL_READ  h' +
        ' ON(h.BOOK_ID=b.BOOK_ID AND h.USER_ID=:user_id)'
    let binds={
        user_id:user_id
    }
    return (await database.execute(sql,binds)).rows;
}


module.exports={
    Reading,Read,Willread,getreadingbooks,gethasreadbooks,getwillreadbooks,getuserbookself
}