const applicationRouter = require("express").Router();

const axios = require("axios");

//--------------------------------------
//get applications                     |
//--------------------------------------
let allApplicationList = async () => {
  try {
    return await axios.get("http://sudeepmishra.com.np/api/all_applications");
  } catch (err) {
    console.log(err);
  }
};

applicationRouter.get("/all-applications", async (req, res) => {
  try {
    const applicationsList = allApplicationList();
    res.json(applicationsList);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error getting applications => applications.js" }),
      err;
  }
});

module.exports = applicationRouter;
