const jwt = require('jsonwebtoken');

const secrets = require('../auth/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.token;

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: "Need authentication" });
            } else {
                req.user = { username: decodedToken.username };
                next();
            }
        });
    } else {
        res.status(400).json({ message: "No credentials provided." });
    }
};