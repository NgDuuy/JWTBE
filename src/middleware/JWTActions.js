import jwt from 'jsonwebtoken';
require('dotenv').config()

const nonSercurePath = ['/', '/login', '/register'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
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
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}
const checkUserJWT = (req, res, next) => {
    if (nonSercurePath.includes(req.path)) return next();
    let cookie = req.cookies;
    let tokenFromHeader = extractToken(req);
    if ((cookie && cookie.jwt) || (tokenFromHeader)) {
        let token = (cookie && cookie.jwt) ? cookie.jwt : tokenFromHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: "Not authenticated the user"
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
const checkPermission = (req, res, next) => {
    if (nonSercurePath.includes(req.path) || req.path === '/account') return next();
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