const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const route = express.Router();
const validate = require("../../validates/admin/product.validate");

const controller = require("../../controllers/admin/product.controller");

route.get("/", controller.product);
route.get("/create", controller.create);
route.get("/edit/:id", controller.edit);
route.get("/detail/:id", controller.detail);
route.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

route.patch("/change-status/:status/:id", controller.changeStatus);
route.patch("/change-multi", controller.changeMulti);
route.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);
route.delete("/delete/:id", controller.deleteItem);

module.exports = route;
