import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoute from "./routes/web.js";
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 8000;
// config view engine
configViewEngine(app);

// init web route
initWebRoute(app);


app.listen(PORT, () => {
    console.log("Back end is running on the port: " + PORT);
});
