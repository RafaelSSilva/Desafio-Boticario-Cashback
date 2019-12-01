/**
 *middlewares that checks if the user is logged in.
 */

const jwt = require('jsonwebtoken');
const configJwt = require('../config/jwt');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token' });

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    // All tokens must have the word bearer
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Bad Token' });

    jwt.verify(token, configJwt.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Token Invalid' });

        req.userId = decoded.id;
        return next();
    })
}