// models
const adminModel = require("../models/Admin");

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
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        msg: "Logged in!",
        token: `Bearer ${token}`,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Error authenticating admin -> ./controllers/authentication.js",
        err,
      });
    }
  },
};
