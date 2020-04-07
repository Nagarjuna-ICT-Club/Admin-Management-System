const jwt = require("jsonwebtoken");

module.exports = {
  userTokenValidation: async (req, res, next) => {
    const accessToken = req.headers.authorization;
    try {
      if (typeof accessToken !== "undefined") {
        const userID = await jwt.verify(accessToken.split(" ")[1], process.env.SECRET_KEY);
        console.log(userID)

        req.userID = userID;
        next();
      } else {
        return res
          .status(403)
          .json({ msg: "Authorisation token not found in header!" });
      }
    } catch (err) {
      res.status(500).json({ msg: "Unauthorised Access Found!" });
    }
  },
};
