const express = require("express");
const validate = require("../../validates/admin/auth.validate");
const route = express.Router();
const controller = require("../../controllers/admin/auth.controller");
route.get("/login", controller.login);
route.get("/logout", controller.logout);
route.post("/login", validate.auth, controller.loginPost);
module.exports = route;
