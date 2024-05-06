const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/product.controller");
route.get("/", controller.product);
route.get("/:slugCategory", controller.category);
route.get("/detail/:slugCategory", controller.detail);

module.exports = route;
