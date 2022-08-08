var conString="(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = server1)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = server2)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))";
  const  database ={
        user: 'lara',
        password: 'laddu',
        tns: conString
    }
    jwtSecretKey= "jmvhDdDBMvqb=M@6h&QVA7x"

    module.exports={database,jwtSecretKey};