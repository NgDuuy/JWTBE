import groupService from '../service/groupService'
const read = async (req, res) => {
    try {
        let data = await groupService.getGroup();
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    }
    catch (e) {
        console.log("Error from read groupController: ", e)
        return res.status(500).json({
            EC: -1,
            EM: "Error from server",
            DT: []
        })
    }
}
module.exports = {
    read
}