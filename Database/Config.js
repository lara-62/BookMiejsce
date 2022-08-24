oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
var conString="(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = server1)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = server2)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))";
  const  database ={
        user: 'lara',
        password: 'laddu',
        tns: conString
    }
    jwtSecretKey= "jmvhDdDBMvqb=M@6h&QVA7x"

    





class Database_class{
    constructor() {
        this.connection = undefined;
    }
    // code to execute sql
    execute=async function(sql, binds){
        let results;
        try {
            if(this.connection === undefined){
                this.connection = await oracledb.getConnection({
                  user: 'lara',
                  password: 'laddu',
                  tns: conString
                });
            }
            results = await this.connection.execute(sql, binds);
            
        } catch (err) {
            console.log("ERROR executing sql: " + err.message);
            console.log(sql);
            console.log(binds);
        }

        return results;
    }

}

module.exports={database,jwtSecretKey,Database_class};