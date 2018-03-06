module.exports = function(env) {
    var returned;
    switch (env) {
        case 'nodejs:dCipher:dev' :
            returned = require('./javascript/nodejs/dCipher/config/webpack.dev.js');
            break;
        case 'nodejs:dCipher:prod' :
            returned = require('./javascript/nodejs/dCipher/config/webpack.prod.js');
            break;
    };

    return returned;
};
