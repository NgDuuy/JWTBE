import { raw } from "body-parser";
import db from "../models"
const getGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']],
            raw: true,
            nest: true,

        });
        if (data) {
            return {
                EC: 0,
                EM: "Get group success",
                DT: data
            }
        }
        else {
            return {
                EC: 2,
                EM: "Get group failed",
                DT: []
            }
        }
    }
    catch (e) {
        console.log("Error from getGroup: ", e)
        return {
            EC: 1,
            EM: "Error from server",
            DT: []
        }
    }
}
module.exports = {
    getGroup
}