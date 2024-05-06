const express = require("express");
const multer = require("multer");
const route = express.Router();
const validate = require("../../validates/admin/account.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const controller = require("../../controllers/admin/account.controller");
route.get("/", controller.account);
route.get("/create", controller.create);
route.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);
route.get("/edit/:id", controller.edit);
route.delete("/delete/:id", controller.delete);
route.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.editPatch,
  controller.editPatch
);
module.exports = route;
