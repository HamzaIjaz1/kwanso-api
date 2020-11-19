var user_model = require('../model/userModel');
var authHelper = require('../authHelper');


module.exports.signup_user = function (request, response) {

    
    user_model.signup_user_model(request.body).then(
        function (result) {
            authHelper.generateToken(result.email).then((token) => {

                console.log(result);
                return response.send(
                    JSON.stringify({
                        status: 1,
                        message: 'User Registered Successfully',
                        user: result,
                        token: token
                    })
                );
            });

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error registering user'
            });
        }
    );

};

module.exports.signin_user = function (request, response) {
    var user = {
        email: request.body.email,
        password: request.body.password
    };

    user_model.signin_user_model(user).then(
        (userinfo) => {
            console.log('user ',userinfo)
            if (typeof userinfo !== 'undefined') {
                authHelper.generateToken(userinfo).then((token) => {
                    return response.json({
                        status: 1,
                        message: "signed in",
                        user: userinfo,
                        token: token
                    });
                });
            } else {
                return response.json({
                    status: 0,
                    message: 'User not found',

                });
            }

        },
        (err) => {
            console.log('Error', err);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: "ERROR"
                })
            );

        }
    );
};

module.exports.get_user = function (email, response) {

    
    user_model.get_user_model(email).then(
        function (result) {

                console.log(result);
                return response.send(
                    JSON.stringify({
                        status: 1,
                        user: result,
                    })
                );

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Not Found'
            });
        }
    );

};