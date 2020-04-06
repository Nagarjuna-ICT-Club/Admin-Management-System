// models
const adminModel = require("../models/Admin");
const adminDetailsModel = require("../models/AdminDetails");

module.exports = {
  adminAuthentication: async (req, res) => {
    const { email, password } = req.body;

    try {
      const adminExist = await adminModel.findOne({ email });

      if (!adminExist)
        return res.status(400).json({
          msg: "Admin with that email do not exist!",
        });

      const isPassword = require("bcrypt").compareSync(
        password,
        adminExist.password
      );

      if (!isPassword)
        return res.status(400).json({
          msg: "Password did not match with the credentials!",
        });

      const token = await require("jsonwebtoken").sign(
        {
          _id: adminExist._id,
        },
        process.env.SECRET_KEY
      );
      const userData = await adminDetailsModel.findOne({ _id: adminExist._id });

      const { full_name } = userData;
      
      res.status(200).json({
        msg: "Logged in!",
        _id: adminExist._id,
        userData: {
          full_name
        },
        token: `bearer ${token}`
      });

    } catch (err) {
      res.status(500).json({
        msg: "Error authenticating admin -> ./controllers/authentication.js",
        err,
      });
    }
  },
};
