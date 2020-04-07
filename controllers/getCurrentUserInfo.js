const adminModel = require("../models/Admin");
const adminDetailsModel = require("../models/AdminDetails");

module.exports = {
    getCurrentUserData: async (req, res) => {
        try{
            const userID = req.headers._id;
        
            const authData = await adminModel.findOne({_id: userID });
            const detailData = await adminDetailsModel.findOne({_id: userID});

            res.status(200).json({authData, detailData});
        }
        catch(err){
            res.status(500).json({msg: "Internal Server Error! => Get Current User Data!"});
        }
    }
}