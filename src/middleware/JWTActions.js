import jwt from 'jsonwebtoken';
require("dotenv").config()
const createJWT = () => {
    let payload = { name: 'Duy', address: 'Dak Lak' };
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log("Check check token: ", token)
    }
    catch (e) {
        console.log("Error in createJWT: ", e)
    }
    return token;
}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded
    }
    catch (e) {
        console.log("Error in verifyToken: ", e)
    }
    return data;
}
module.exports = {
    createJWT, verifyToken
}