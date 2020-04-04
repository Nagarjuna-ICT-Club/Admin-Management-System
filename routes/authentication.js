const authRouter = require("express").Router();

// controllers
const adminAuthentication = require("../controllers/authentication").adminAuthentication;

// paths
authRouter.post("/auth-admin", adminAuthentication);

module.exports = authRouter;
