import userApiService from '../service/userApiService'
const read = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        }
        else {
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        }
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
const checkValidateInput = (data) => {
    let arr = ['email', 'phoneNumber', 'username', "password", "address", "group"];
    for (let i = 0; i < arr.length; i++) {
        if (data[arr[i]] === "") {
            console.log("Missing arr[i]", arr[i])
            return false;
        }
    }
    return true;
}
const create = async (req, res) => {
    try {
        let check = checkValidateInput(req.body)
        if (check === false) {
            return res.status(500).json({
                EC: 2,
                EM: "Missing parameter required...",
                DT: ""
            })
        }
        let data = await userApiService.createNewUser(req.body.data)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log("Error in create userController2: ", e)
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
            DT: ""
        })
    }
}
const update = (req, res) => {
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
const deleteUser = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
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