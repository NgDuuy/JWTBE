import express from "express";

const router = express.Router();
export default function initWebRoute(app) {
    router.get('/', (req, res) => {
        return res.send("Hello world")
    })
    return app.use('/', router);
}