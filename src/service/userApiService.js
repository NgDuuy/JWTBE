import { where } from "sequelize";
import db from "../models";
const getAllUser = async () => {
    let data = {
        EM: '',
        EC: '',
        DT: ''
    }
    try {
        let users = await db.Users.findAll({
            attributes: ['id', 'username', 'email', 'phoneNumber', 'sex'],
            include: { model: db.Group, attributes: ['name', "description"] }
        });
        if (users) {
            return {
                EM: "Get data success",
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: []
            }
        }
    }
    catch (e) {
        console.log("Error in getAllUser: ", e)
        return {
            EM: 'Something wrong from with services',
            EC: 1,
            DT: ''
        }
    }
}
const createNewUser = async (data) => {
    try {
        await db.Users.create({

        })
    }
    catch (e) {
        console.log("Error in createNewUser: ", e)
        return {
            EM: 'Something wrong from with services',
            EC: 1,
            DT: ''
        }
    }
}
const updateUser = async (data) => {
    try {
        let user = await db.Users.findOne({
            where: { id: data.id }
        })
        if (user) {

        } else {
            //Not found
        }
    } catch (e) {
        console.log("Error in updateUser: ", e)
        return {
            EM: 'Something wrong from with services',
            EC: 1,
            DT: ''
        }
    }
}
const deleteUser = async (id) => {
    try {
        await db.Users.delete({
            where: { id: id }
        })
    } catch (e) {
        console.log("Error in deleteUser: ", e)
        return {
            EM: 'Something wrong from with services',
            EC: 1,
            DT: ''
        }
    }
}
module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}