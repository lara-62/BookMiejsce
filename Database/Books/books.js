const config = require('../Config');
const oracledb = require('oracledb');
const { retry } = require('async');
const database = new config.Database_class();


async function upload_book(res,req) {

    let title1= req.body.title.toLowerCase();
    let pd1= req.body.pd;
    let isbn1=req.body.isbn
    let language1=req.body.language.toLowerCase()
    let number_of_pages1=req.body.nop
    let image1=req.files.cover.name
    let description1=req.body.description
    let publisher1=req.body.publisher
    let author=req.body.author.toLowerCase()
    let genre1=req.body.genre.toLowerCase()
    let genre_class=genre1.split(",")
   

    let sql1='INSERT INTO PUBLISHER(PUBLISHER_NAME)VALUES(:publisher) RETURNING PUBLISHER_ID INTO :publisher_id'
    let binds1={
        publisher:publisher1,
        publisher_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT
        },
    }
    let result1=await database.execute(sql1,binds1)
    console.log(result1.outBinds.publisher_id[0])
    let sql = 'INSERT INTO BOOKS(TITLE,PUBLICATION_DATE,ISBN,LANGUAGES,NUMBER_OF_PAGES,IMAGE_URL,DESCRIPTION,PUBLISHER_ID)' +
    'VALUES(:title,TO_DATE(:pd,\'YYYY-MM-DD\'),:isbn,:language,:number_of_pages,:image,:description,:publisher_id) RETURNING'+
    ' BOOK_ID INTO :book_id';
    let book= {
        title:title1,
        pd:pd1,
        isbn:isbn1, 
        language:language1,
        number_of_pages:number_of_pages1,
        image:image1,
        description: description1,
        publisher_id:result1.outBinds.publisher_id[0],
        book_id:{
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT
        }
        
    }
    let result = await database.execute(sql, book);
    for (let i = 0; i < genre_class.length; i++) {
        let sql2 = 'INSERT INTO GENRE(NAME)VALUES(:genre) RETURNING GENRE_ID INTO :genre_id';
        let binds = {
            genre: genre_class[i],
            genre_id:
            {
                type: oracledb.NUMBER,
                dir: oracledb.BIND_OUT
            }
        }
        let result2 = await database.execute(sql2, binds);

        let sql3 = 'INSERT INTO OF_GENRE VALUES(:book_id,:genre_id)'
        let binds3 = {
            book_id: result.outBinds.book_id[0],
            genre_id: result2.outBinds.genre_id[0]
        }
        let result3 = await database.execute(sql3, binds3)
    }
    let sql4='INSERT INTO USERS(FULL_NAME)VALUES(:user_name) RETURNING USER_ID INTO :user_id'
    let binds4={
        user_name:author,
        user_id:
        {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT 
        }
    }
    let result4=await database.execute(sql4,binds4)
    let sql5='INSERT INTO AUTHOR(USER_ID)VALUES(:author_id)'
    let binds5={
        author_id:result4.outBinds.user_id[0]
    }
    let result5=await database.execute(sql5,binds5);
    let sql6='INSERT INTO WRITES VALUES(:user_id,:book_id)'
    let binds6={
        user_id:result4.outBinds.user_id[0],
        book_id:result.outBinds.book_id[0]
    }
    let result6=await database.execute(sql6,binds6);


    //  let connection=undefined;
    //  oracledb.getConnection(config.database,async(err,con)=>
    //  {
    //      if(err)
    //      {
    //         console.log(err);
    //      }
         

        
    
    //     else {

    //         console.log('okay_datbase');
    
            // let sql = 'INSERT INTO BOOKS(TITLE,PUBLICATION_DATE,ISBN,LANGUAGES,NUMBER_OF_PAGES,IMAGE_URL,DESCRIPTION)' +
            //     'VALUES(:title,TO_DATE(:pd,\'YYYY-MM-DD\'),:isbn,:language,:number_of_pages,:image,:description)';
    //         let binds =books
    //         console.log(binds);
    //         con.execute(sql,binds,{
    //                 autoCommit: true
    //             },(err,results)=>
    //         {
    //             if(err)
    //             {
    //                 console.log(err);
    //             }
    //             else
    //             {
    //                 console.log('execution okay');
    //                 console.log(results);
    //                 res.redirect('/Admin/Home');
                    
    //             }
    //             con.release(function (err) {
    //                 if (err) {
    //                     console.error(err.message);
    //                 }
    //             });
    //         })


    //     }
    // })
}


async function get_all_books()
{
    
     sql='SELECT * FROM BOOKS';
     return result = (await database.execute(sql, {})).rows;
    
   
           
}

async function getBookByName(name)
{   let sql='SELECT b.BOOK_ID AS BOOK_ID, TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME, '+
'p.PUBLISHER_NAME,p.PUBLISHER_ID,u.USER_ID '+
' FROM BOOKS b JOIN'+
' WRITES w ON(b.BOOK_ID=w.BOOK_ID)'+
' JOIN USERS u ON (w.USER_ID=u.USER_ID)'+
' JOIN PUBLISHER p'+
' ON(p.PUBLISHER_ID=b.PUBLISHER_ID)'+
' WHERE TITLE=:title';
    let result= (await database.execute(sql,{title:name})).rows;
    console.log(result);
    return result;
}
async function getBookBygenre(genre_name)
{
    let sql='SELECT b.BOOK_ID AS BOOK_ID, TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME, '+
    'p.PUBLISHER_NAME ,g.NAME as genre_name,p.PUBLISHER_ID,g.GENRE_ID,u.USER_ID '+
    ' FROM BOOKS b JOIN'+
    ' WRITES w ON(b.BOOK_ID=w.BOOK_ID)'+
    ' JOIN USERS u ON (w.USER_ID=u.USER_ID)'+
    ' JOIN OF_GENRE of_g'+
    ' ON (b.BOOK_ID=of_g.BOOK_ID)'+
    ' JOIN GENRE g'+
    ' ON(of_g.GENRE_ID=g.GENRE_ID)'+
    ' JOIN PUBLISHER p'+
    ' ON(p.PUBLISHER_ID=b.PUBLISHER_ID)'+
    ' WHERE g.NAME=:genrename';
    let binds={
       genrename:genre_name
    }
    let result=(await database.execute(sql,binds)).rows;
    console.log(result);
    return result; 
}
async function getBookByAuthor(author_name)
{
    let sql='SELECT b.BOOK_ID AS BOOK_ID, TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME, '+
    'p.PUBLISHER_NAME ,p.PUBLISHER_ID,u.USER_ID '+
    ' FROM BOOKS b JOIN'+
    ' WRITES w ON(b.BOOK_ID=w.BOOK_ID)'+
    ' JOIN USERS u ON (w.USER_ID=u.USER_ID)'+
    ' JOIN PUBLISHER p'+
    ' ON(p.PUBLISHER_ID=b.PUBLISHER_ID)'+
    ' WHERE u.FULL_NAME=:author_name';
    let binds={
       author_name:author_name
    }
    let result=(await database.execute(sql,binds)).rows;
    console.log(result);
    return result;  
}
     
async function getBookDetails(Book_id)
{
       let sql='SELECT b.BOOK_ID AS BOOK_ID, TITLE,PUBLICATION_DATE,b.IMAGE_URL as IMAGE_URL,DESCRIPTION,ISBN,LANGUAGES,NUMBER_OF_PAGES ,u.FULL_NAME as AUTHOR_NAME, '+
       'p.PUBLISHER_NAME ,p.PUBLISHER_ID,u.USER_ID '+
       ' FROM BOOKS b JOIN'+
       ' WRITES w ON(b.BOOK_ID=w.BOOK_ID)'+
       ' JOIN USERS u ON (w.USER_ID=u.USER_ID)'+
       ' JOIN PUBLISHER p'+
       ' ON(p.PUBLISHER_ID=b.PUBLISHER_ID)'+
       ' WHERE b.BOOK_ID=:id';
       let binds={
        id:Book_id
       }
       let result=(await database.execute(sql,binds)).rows;
       console.log(result);
       return result;

}
 

async function number_of_peopleReadingtheBook(bookid)
{
    let sql='SELECT COUNT(*) as peoplecount FROM READING WHERE BOOK_ID=:bookid UNION ALL SELECT COUNT(*) as count FROM WILL_READ WHERE BOOK_ID=:bookid';
    let binds={
        bookid:bookid
    }
    return (await database.execute(sql,binds)).rows
    
}
async function genre_of_book(book_id)
{
    let sql='SELECT Name as genre_name  FROM  GENRE G JOIN OF_GENRE OG ON(G.GENRE_ID=OG.GENRE_ID) WHERE BOOK_ID=:bookid';
    let binds={
        bookid:book_id
    }
    return (await database.execute(sql,binds)).rows



}



module.exports={upload_book,get_all_books,getBookByName,getBookDetails,getBookByAuthor,getBookBygenre,number_of_peopleReadingtheBook,genre_of_book}