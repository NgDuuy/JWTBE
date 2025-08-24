import express from "express";
import configViewEngine from "./config/viewEngine.js";
import initWebRoute from "./routes/web.js";
import bodyParser from 'body-parser';
import { connection } from './config/connectDB.js'
import initApiRoute from './routes/api.js';
import configCors from './config/cors.js'
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 8000;

//Config cors
configCors(app)

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//test connection db
connection();

// init web route
initWebRoute(app);
initApiRoute(app);

app.listen(PORT, () => {
    console.log("Back end is running on the port: " + PORT);
});
