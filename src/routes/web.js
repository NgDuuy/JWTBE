import express from "express";
import homeController from "../controller/homeController"
import { testApi } from "../controller/apiController";
const router = express.Router();


export default function initWebRoute(app) {
    router.get('/', homeController.handleHelloWork);
    router.get('/user', homeController.handleUserPage)
    router.post('/user/create-user', homeController.handleCreateNewUser)
    return app.use('/', router);
}