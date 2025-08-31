import jwt from 'jsonwebtoken';
require('dotenv').config()

const nonSercurePath = ['/', '/login', '/register'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    }
    catch (e) {
        console.log("Error in createJWT: ", e)
    }
    return token;
}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    }
    catch (e) {
        console.log("Error in verifyToken: ", e)
    }
    return decoded;
}
const checkUserJWT = (req, res, next) => {
    if (nonSercurePath.includes(req.path)) return next();
    let cookie = req.cookies;
    if (cookie && cookie.jwt) {
        let token = cookie.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded
            next();
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: "Not authenticated the user"
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: "Not authenticated the user"
        })
    }

}
const checkPermission = (req, res, next) => {
    if (nonSercurePath.includes(req.path)) return next();
    if (req.user) {
        let user = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't have permission to access`
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess === true) {
            next();
        }
        else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't have permission to access`
            })
        }

    }
    else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: "Not authenticated the user"
        })
    }
}
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkPermission
}