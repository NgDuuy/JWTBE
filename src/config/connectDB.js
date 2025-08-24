import { Sequelize } from "sequelize";
const sequelize = new Sequelize('JWT', 'root', '2210510', {
    host: 'localhost',
    dialect: 'mysql'
});

// test connection
const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully. ");
    }
    catch (err) {
        console.log("Unable to connect to the database: ", err);
    }
}
module.exports = {
    connection
}