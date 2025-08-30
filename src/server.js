import express from "express";
import configViewEngine from "./config/viewEngine.js";
import initWebRoute from "./routes/web.js";
import bodyParser from 'body-parser';
import { connection } from './config/connectDB.js'
import initApiRoute from './routes/api.js';
import configCors from './config/cors.js';
import { createJWT, verifyToken } from './middleware/JWTActions.js'
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

//test jwt
createJWT()
let decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRHV5IiwiYWRkcmVzcyI6IkRhayBMYWsiLCJpYXQiOjE3NTY1MzA1NjN9.ZEVi0Xw59pDz2ud8LO1_v2KPzkNEb4W0VGRtmixiaUY")
console.log("Check decodedData: ", decodedData)
// init web route
initWebRoute(app);
initApiRoute(app);

app.listen(PORT, () => {
    console.log("Back end is running on the port: " + PORT);
});
