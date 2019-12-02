const jwt = require('jsonwebtoken');

// hash md5 of the application.
const secret = "gfd49ov2fd5ds345grgfkgjfhgurfs456d245f2aad5422gjnfdsnfddns"
const expiresIn = 86400; //Token Expression Time.

/**
     * generate the token for the user
     * @param {*}id  User ID.
.    */
exports.generateToken = function(id) {
    return jwt.sign({ id }, secret, { expiresIn });
}

exports.secret = secret;
exports.expiresIn = expiresIn;