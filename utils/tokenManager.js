const jwt = require("jsonwebtoken");

const accessTokenSecretKey = "testing-zaidan";

function generateAccessToken(userPayload) {
    return jwt.sign(userPayload, accessTokenSecretKey, {
        subject: userPayload.email,
        expiresIn: "45m",
    });
}

module.exports = generateAccessToken;