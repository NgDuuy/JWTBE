require("dotenv").config()
const configCors = (app) => {

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })

}
export default configCors;