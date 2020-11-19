var config = require('./config');
var jwt = require('jsonwebtoken');

module.exports.verify = (req, res, next) => {
    var bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        console.log('Token Found');
        // const b = bearer.split(' ');

        // const bearerToken = b[1];

        console.log('bearer token is', bearer);

        req.token = bearer;
        next();

    } else {
        console.log('Token not found');
        return res.status(401).send();
    }


};

module.exports.generateToken = function (user, callback) {
    
    return new Promise(function (resolve, reject) {
        try {
            console.log('uss ', user)
            var token = jwt.sign({
                data: user
            }, config.tokenKey.value, {
                expiresIn: '10 days'
            });
            resolve('Bearer '+token);
        } catch (err) {
            reject(err);
        }
    });


};


module.exports.isAuthenticated = function (req) {
    var token = req.headers.session_key.split(' ')[1];
    return new Promise(function (resolve, reject) {
        try {
            const dec = jwt.verify(token, config.tokenKey.value);
                    req.info = dec.data;
                    resolve(dec);
        } catch (error) {
            reject(error);

        }
    });
}