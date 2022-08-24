var oracledb = require('oracledb');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../../Database/Config.js');
const user_profile = require('../../route/users/user_profile');


function post(req, res, next) {
    let errors = [];
    oracledb.getConnection(
        config.database,
        function (err, connection) {
            if (err) {

                return next(err);
            }

            connection.execute(
                'select users.user_id as "id", ' +
                '   email as "email", ' +
                '   password as "password", ' +
                '   role as "role" ' +
                'from users,reader ' +
                'where email = :email and users.user_id=reader.user_id',
                {
                    email: req.body.email.toLowerCase()
                },
                {
                    outFormat: oracledb.OBJECT
                },
                function (err, results) {
                    var user;

                    if (err) {
                        connection.release(function (err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return next(err);
                    }
                    console.log(results.rows[0]);
                    if (results.rows[0] === undefined) {
                        errors.push('Wrong Email');

                        res.render('Home', {
                            msg: [],
                            error: errors
                        })

                    }
                    else {
                        user = results.rows[0];

                        bcrypt.compare(req.body.password, user.password, function (err, pwMatch) {
                            var payload;

                            if (err) {
                                return next(err);
                            }

                            if (!pwMatch) {
                                // res.status(401).send({message: 'Invalid email or password.'});
                                // return;
                                errors.push('Invalid email or password.');
                            }

                            payload = {

                                user_id: user.id,
                                sub: user.email,
                                role: user.role
                            };
                            //console.log(process.env);
                            console.log(payload.user_id+'blah');
                            const token = jwt.sign(payload, config.jwtSecretKey,{expiresIn:'1h'});
                            
                            let options = {
                                maxAge: 90000000,
                                httpOnly: true,
                                SameSite:'None'
                            }
                            
                            res.cookie("auth", token, options);

                            // res.status(200).json({
                            //     user: user,
                            //     token: token
                            // });
                            if (errors.length === 0) {
                                res.redirect('/user-profile');
                            }
                            else {
                                res.render('Home', {
                                    msg: [],
                                    error: errors
                                })

                            }

                        });
                    }


                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });

                });
        }
    );



}

module.exports.post = post;