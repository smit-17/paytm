const { Router } = require("express");
const userRoute = require("./user");
const accountRoute = require("./account");
const route = Router();
route.use("/user", userRoute);
route.use("/account", accountRoute);
module.exports = route;
