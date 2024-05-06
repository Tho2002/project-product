const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");
module.exports.account = async (req, res) => {
  let find = { deleted: false };
  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false,
    });
    record.role = role;
  }
  res.render("admin/pages/account/index.pug", {
    titlePage: "Danh sách tài khoản",
    records: records,
  });
};
module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/account/create.pug", {
    titlePage: "Tạo mới tài khoản",
    roles: roles,
  });
};
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash(
      "error",
      `Email ${req.body.email}đã tồn tại ,vui lòng nhập email khác`
    );
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };
  try {
    const record = await Account.findOne(find);
    const roles = await Role.find({ deleted: false });
    res.render("admin/pages/account/edit.pug", {
      titlePage: "Chỉnh sửa tài khoản",
      record: record,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
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
      req.flash("error", "Cập nhật sản phẩm thất bại");
    }
  }

  res.redirect("back");
};
module.exports.delete = async (req, res) => {
  const id = req.params.id;

  await Account.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date(),
      },
    }
  );
  req.flash("success", "Xóa tài khoản thành công");
  res.redirect("back");
};
