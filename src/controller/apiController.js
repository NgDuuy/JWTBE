import userService from '../service/userService'
const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.username || !req.body.phoneNumber) {
            return res.status(200).json({
                EM: 'Missing required parameter',
                EC: '1',
                DT: ''
            })
        }
        if (req.body.password && req.body.password.length < 6) {
            return res.status(200).json({
                EM: 'Your password must have more than 6 letters',
                EC: '1',
                DT: ''
            })
        }
        let data = await userService.handleRegisterService(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (e) {
        console.log("Error in handleRegister: ", e)
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await userService.handleUserLoginService(req.body);
        // set cookies
        //maxAge setup time to kill cookie
        res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (e) {
        console.log("Error in handleLogin: ", e);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ''
        })
    }
}
module.exports = {
    handleRegister, handleLogin
}