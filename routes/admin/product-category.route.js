const express = require("express");
const route = express.Router();
const multer = require("multer");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const controller = require("../../controllers/admin/product-category.controller");
route.get("/", controller.index);
route.get("/create", controller.create);
route.get("/edit/:id", controller.edit);
route.delete("/delete/:id", controller.delete);
route.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

route.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);
module.exports = route;
