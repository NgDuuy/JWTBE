import db from "../models";
import bcrypt from 'bcrypt';
const saltRounds = 10;
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
const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * (limit);
        let { count, rows } = await db.Users.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phoneNumber', 'sex', "address"],
            include: { model: db.Group, attributes: ['name', "description", 'id'] },
            order: [['id', 'DESC']],
        })
        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'Get user pagination success',
            EC: 0,
            DT: data
        }
    }
    catch (e) {
        console.log("Error in getUserWithPagination: ", e)
        return {
            EM: 'Something wrong from with services',
            EC: 1,
            DT: ''
        }
    }
}
const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashPass = bcrypt.hashSync(password, salt);
    return hashPass
}
const checkEmailExist = async (email) => {
    let checkEmail = await db.Users.findOne({
        where: { email: email }
    })

    if (checkEmail) {
        return true;
    }
    else {
        return false;
    }
}
const checkPhoneExist = async (phoneNumber) => {
    let checkPhone = await db.Users.findOne({
        where: { phoneNumber: phoneNumber }
    })
    if (checkPhone) {
        return true;
    }
    else {
        return false;
    }
}
const createNewUser = async (data) => {
    try {
        console.log("Check data: ", data.username)
        let checkEmail = await checkEmailExist(data.email);
        let checkPhone = await checkPhoneExist(data.phoneNumber);
        if (checkEmail) {
            return {
                EM: 'The email was already exist',
                EC: 1,
                DT: "email"
            }
        }
        if (checkPhone) {
            return {
                EM: 'The phone number was already exist',
                EC: 1,
                DT: "phoneNumber"
            }
        }
        let hashPass = hashPassword(data.password);
        console.log("Check check in createNewUser1: ")
        await db.Users.create({
            email: data.email,
            password: hashPass,
            username: data.username,
            phoneNumber: data.phoneNumber,
            sex: data.gender,
            groupId: data.groupId,
            address: data.address
        })
        return {
            EM: 'Create new user success',
            EC: 0,
            DT: ''
        }
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
        if (!data.groupId) {
            return {
                EM: 'Update error. Group id not found',
                EC: 1,
                DT: 'Group'
            }
        }
        let user = await db.Users.findOne({
            where: { id: data.userData.id }
        })
        if (user) {
            await user.update({
                username: data.userData.username,
                phoneNumber: data.userData.phoneNumber,
                address: data.userData.address,
                sex: data.userData.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Update success',
                EC: 0,
                DT: ''
            }
        } else {
            //Not found
            return {
                EM: 'Update error. Not found user',
                EC: 2,
                DT: ''
            }
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
        let user = await db.Users.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user success',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'User is not exist',
                EC: 2,
                DT: ''
            }
        }
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
    getAllUser, createNewUser, updateUser, deleteUser,
    getUserWithPagination
}