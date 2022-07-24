// var conString="(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = server1)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = server2)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))";
    

// oracledb = require('oracledb')
// oracledb.autoCommit = true;

// // creates connection pool for oracledb
// async function startup() {
//     console.log('starting up database.');
//     await oracledb.createPool({
//         user: 'lara',
//         password:'laddu',
//         connectstring:conString,
//         poolMin: 4,
//         poolMax: 10,
//         poolIncrement: 1
//     });
//     console.log('pool created');
// }

// // closes connection pool for oracledb
// async function shutdown() {
//     console.log('shutting down database.');
//     try {
//         // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
//         await oracledb.getPool().close(10);
//         console.log('Pool closed');
//     } catch(err) {
//         console.log("ERROR shutting down database: "+err.message);
//     }
// }

// // code to execute sql
// async function execute(sql, binds, options,){
//     let connection, results;
//     try {
//         // Get a connection from the default pool
//         connection = await oracledb.getConnection();
//         results = await connection.execute(sql, binds, options);
//     } catch (err) {
//         console.log("ERROR executing sql: " + err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Put the connection back in the pool
//                 await connection.close();
//             } catch (err) {
//                 console.log("ERROR closing connection: " + err);
//             }
//         }
//     }
//     return results;
// }

// // code to execute many sql
// async function executeMany(sql, binds, options){
//     let connection;
//     try {
//         // Get a connection from the default pool
//         connection = await oracledb.getConnection();
//         await connection.executeMany(sql, binds, options);
//     } catch (err) {
//         console.log("ERROR executing sql: " + err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Put the connection back in the pool
//                 await connection.close();
//             } catch (err) {
//                 console.log("ERROR closing connection: " + err);
//             }
//         }
//     }

//     return;
// }


// // options for execution sql
// const options = {
//     outFormat: oracledb.OUT_FORMAT_OBJECT
// }

// module.exports = {
//     startup,
//     shutdown,
//     execute,
//     executeMany,
//     options
// };












// var express=require('express');
// const { autoCommit } = require('oracledb');
// var router=express.Router();
// var oracledb=require('oracledb');
// var conString="(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = server1)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = server2)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))";
    
// const con=oracledb.getConnection({
//     user:'lara',
//          password:'laddu',
//          tns:conString,
// })
// module.exports=con;

// router.post('/reg-std',function(req,res,next)
// {
//      name=req.body.email;
//      fame=req.body.password;

//    var conString="(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = server1)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = server2)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))";
    
   
//    oracledb.getConnection(
//     {
//         user:'lara',
//         password:'laddu',
//         tns:conString,
//     },
//     function(err,con)
//     {
//        if(err)
//        {
//         res.send('db con error');
//        }
//        else
//        {
//         var q="insert into inend values('"+name+"','"+fame+"')";
//         con.execute(q,[],{autoCommit:true},function(e,s)
//         {
//             if(e)
//             {
//                 res.send(e);
//             }
//             else
//             {    setTimeout(    ()=>{res.send("login successful!");},10000)
            
//             }
//         })
//        }
//     }
//    )
// })
// module.exports=router;