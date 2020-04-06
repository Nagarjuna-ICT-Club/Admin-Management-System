const jwt = require("jsonwebtoken")

module.exports = {
  userTokenValidation: async (req, res, next) => {
    try {
        
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Internal Server Error! => Authentication Middleware!" });
    }
  },
};
