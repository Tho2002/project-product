const express = require("express");
const multer = require("multer");
const route = express.Router();
const validate = require("../../validates/admin/account.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const controller = require("../../controllers/admin/my-account.controller");
route.get("/", controller.index);
route.get("/edit", controller.edit);

route.patch(
  "/edit",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);
module.exports = route;
