const oracledb=require('oracledb')
const config=require('./oracleCon');

function get(req, res, next) {
    oracledb.getConnection(
        config.database,
        function(err, connection){
            if (err) {
                return next(err);
            }

            connection.execute(
                'select column1 as "column1" ' +
                'from jsao_public_things ',
                {},//no binds
                {
                    outFormat: oracledb.OBJECT
                },
                function(err, results){
                    if (err) {
                        connection.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return next(err);
                    }

                    res.status(200).json(results.rows);

                    connection.release(function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                });
        }
    );
}

module.exports.get = get;