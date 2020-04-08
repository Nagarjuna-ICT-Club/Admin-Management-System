const adminDetailsModel = require("../models/AdminDetails");
const studentDetailsModel = require("../models/StudentDetails");
const teacherDetailsModel = require("../models/TeacherDetails");

module.exports = {
    countUsers: async (req, res) => {
        let countUser = {
            admin: 0,
            student: 0,
            teacher: 0
        }
        try{
            countUser = {
                admin: await adminDetailsModel.count(),
                student: await studentDetailsModel.count(),
                teacher: await teacherDetailsModel.count()
            }

            res.status(200).json({
                countUser
            })
        }catch(err){
            res.status(500).json({
                msg: "Internal Server Error => /count-users"
            })
        }
    }
}