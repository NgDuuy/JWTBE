import userApiService from '../service/userApiService'
const read = async (req, res) => {
    try {
        let data = await userApiService.getAllUser();
        console.log("Check data: ", data.DT)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    }
    catch (e) {
        console.log("Error in read userController1: ", e)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server...",
            DT: ""
        })
    }
}
const create = () => {
    try {

    } catch (e) {
        console.log("Error in create userController2: ", e)
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
            DT: ""
        })
    }
}
const update = (userId) => {
    try {

    } catch (e) {
        console.log("Error in update userController: ", e)
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
            DT: ""
        })
    }
}
const deleteUser = (userId) => {
    try {

    } catch (e) {
        console.log("Error in deleteUser userController: ", e)
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
            DT: ""
        })
    }
}
module.exports = { read, create, update, deleteUser };