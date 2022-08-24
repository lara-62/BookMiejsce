
const config = require('../../Database/Config');
const oracledb = require('oracledb');


 async function getUserById(user_id) {
    console.log(user_id + "  hjgfhfg");
     let connection= await oracledb.getConnection(config.database) 
     
        if (connection==undefined) {
            console.log("not okaaay");
            //console.log(err);
        }
        else {
            const sql = 'SELECT * '+
            'FROM READER,USERS '+
            'WHERE READER.user_id = :user_id and READER.user_id=USERS.user_id ';
             console.log('yo');
            const binds = {
                user_id: user_id
            }
            try {
                console.log('okay');
                let result= (await connection.execute(sql, binds, { outFormat: oracledb.OBJECT }));
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
                return result.rows[0];
                
              
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    


module.exports = {
    getUserById
}