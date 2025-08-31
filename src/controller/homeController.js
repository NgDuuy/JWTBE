import express from "express"
import userService from '../service/userService'

const handleHelloWork = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = async (req, res) => {
    res.cookie("test", "test cookies")
    console.log('Cookies: ', req.cookies)
    let listUser = await userService.getListUserService()
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.emailName;
    let password = req.body.password;
    let userName = req.body.userName;
    userService.createNewUserService(password, email, userName);
    return res.send("Check check")
}
const handleDeleteUser = async (req, res) => {
    let data = await userService.handleDeleteUserService(req.params.id);
}
const handleEditUser = async (req, res) => {
    await userService.handleEditUserService(req.params.id);
}
module.exports = {
    handleHelloWork, handleUserPage,
    handleCreateNewUser, handleDeleteUser,
    handleEditUser
}