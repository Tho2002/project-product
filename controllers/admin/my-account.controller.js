const md5 = require("md5");
const Account = require("../../models/account.model");
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
    titlePage: "Thông tin cá nhân",
  });
};
module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit.pug", {
    titlePage: "Chỉnh sửa thông tin cá nhân",
  });
};
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash(
      "error",
      `Email ${req.body.email}đã tồn tại ,vui lòng nhập email khác`
    );
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    try {
      await Account.updateOne({ _id: id }, req.body);
      req.flash(
        "success",
        `Tài khoản ${req.body.fullName} cập nhật thành công`
      );
    } catch (error) {
      req.flash("error", "Cập nhật tài khoản thất bại");
    }
  }

  res.redirect("back");
};
