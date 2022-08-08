
const config=require('../../Database/Config');
const oracledb=require('oracledb');

async function getUserById(user_id)
{
     oracledb.getConnection(
        config.database,async(err,con)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {   let sql= 'select user_id from users where email=:email '
               try{
                return await con.execute(sql,{email:user_id});
               }
               catch(err)
               {
                console.log(err);
               }
            }
        }
     ) 
}

module.exports={
    getUserById
}