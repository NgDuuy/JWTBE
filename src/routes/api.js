import express from "express";
import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from "../controller/groupController"
const router = express.Router();


export default function initApiRoute(app) {
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)

    router.get("/user/read", userController.read);
    router.post("/user/create", userController.create);
    router.put("/user/update", userController.update);
    router.delete("/user/delete", userController.deleteUser);

    router.get("/group/read", groupController.read);
    return app.use('/api/v1/', router);
}