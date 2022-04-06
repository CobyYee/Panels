const jwt = require("jsonwebtoken")
const crypto = require("crypto-js")

function authManager() {
    // function to verify request cookies
    verifyJWT = function(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }
    }

    // function to create token by encrypting userId with secret key
    signJWT = function (user) {
        return jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, { expiresIn: '1h'});
    }

    encryptUser = function(userId) {
        if (!userId) {
            return -1;
        }
        let id = "" + userId;
        let secret = "" + process.env.TOKEN_SECRET;
        const encrypted = crypto.AES.encrypt(id, secret);
        return encrypted
    }

    decryptUser = function(encrypted) {
        if (!encrypted) {
            return -1;
        }
        let id = "" + encrypted;
        let secret = "" + process.env.TOKEN_SECRET;
        return crypto.AES.decrypt(id, secret);
    }

    return this;
}

const auth = authManager();
module.exports = auth;
