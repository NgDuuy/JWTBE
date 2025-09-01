import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import db from '../models/index'
import { Op } from 'sequelize';
import { getGroupWithRole } from '../service/JWTService'
import { createJWT } from '../middleware/JWTActions'
require('dotenv').config()
const saltRounds = 10;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2210510',
    database: 'JWT'
})
const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashPass = bcrypt.hashSync(password, salt);
    return hashPass
}
// const createNewUserService = async (password, email, userName) => {
//     password = hashPassword(password);
//     try {
//         await db.Users.create({
//             email: email,
//             password: password,
//             username: userName
//         })
//     }
//     catch (e) {
//         console.log("Check error in createNewUserService: ", e)
//     }
// }
// const getListUserService = async () => {
//     let users = [];
//     users = await db.Users.findAll({
//         raw: true
//     });
//     return users;
// }
// const handleDeleteUserService = async (userId) => {
//     await db.Users.destroy({
//         where: { id: userId }
//     })
// }
// const handleEditUserService = async (userId) => {
//     let user = await db.Users.findOne({
//         where: { id: userId }
//     })
//     return user.get({ plain: true })
// }
// const handleUpdateUserInforService = async (email, userName, id) => {
//     await db.Users.update(
//         { email: email, username: userName },
//         {
//             where: { id: id },
//         })
// }
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
const handleRegisterService = async (inputData) => {
    let checkEmail = await checkEmailExist(inputData.email);
    let checkPhone = await checkPhoneExist(inputData.phoneNumber);
    if (checkEmail) {
        return {
            EM: 'The email was already exist',
            EC: 1,
            DT: ""
        }
    }
    if (checkPhone) {
        return {
            EM: 'The phone number was already exist',
            EC: 1,
            DT: ""
        }
    }
    let hashPass = hashPassword(inputData.password);
    try {
        await db.Users.create({
            email: inputData.email,
            password: hashPass,
            username: inputData.username,
            phoneNumber: inputData.phoneNumber,
            groupId: 6
        })
        return {
            EM: 'A new user has created successfuly',
            EC: 0,
            DT: ""
        }
    }
    catch (e) {
        console.log("Check error in createNewUserService: ", e)
        return {
            EM: 'Something wrongs in service',
            EC: 2,
            DT: ""
        }
    }
}
const checkPassword = (inputPassword, hassPassword) => {
    return bcrypt.compareSync(inputPassword, hassPassword)
}
const handleUserLoginService = async (userData) => {
    try {
        let user = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { email: userData.valueLogin },
                    { phoneNumber: userData.valueLogin }
                ]
            },
        })
        if (user) {
            let checkPasswordCorrect = await checkPassword(userData.password, user.password);
            if (checkPasswordCorrect === true) {
                // let token=

                //Test role
                let groupWithRoles = await getGroupWithRole(user);
                let payload = {
                    email: user.email,
                    username: user.username,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload);
                return {
                    EM: 'Ok ',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }
        console.log("Not found user email or phonenumber: ", userData.valueLogin, " Password: ", userData.password)
        return {
            EM: 'Your email or phone number or password is incorrest!',
            EC: 1,
            DT: ''
        }
    }
    catch (e) {
        console.log("Error in handleUserLoginService: ", e)
        return {
            EM: 'Error from server...',
            EC: -1,
            DT: ''
        }
    }
}
module.exports = {
    // createNewUserService, getListUserService,
    // handleDeleteUserService, handleEditUserService,
    handleRegisterService,
    handleUserLoginService
}