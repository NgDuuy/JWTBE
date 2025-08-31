import express from "express";
import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import { checkUserJWT, checkPermission } from "../middleware/JWTActions"
const router = express.Router();

// const testMiddleWare = (req, res, next) => {
//     console.log("Call testMiddleWare")
//     next();
// }
// const checkUserLogin = (req, res, next) => {
//     const nonSecurePaths = ['/', '/login', '/register'];
//     if (nonSecurePaths.includes(req.path)) return next();

//     if(user){

//     }
//     el
//     next();
// }
export default function initApiRoute(app) {
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)


    router.get("/user/read", checkUserJWT, checkPermission, userController.read);
    router.post("/user/create", userController.create);
    router.put("/user/update", userController.update);
    router.delete("/user/delete", userController.deleteUser);

    router.get("/group/read", groupController.read);

    return app.use('/api/v1/', router);
}