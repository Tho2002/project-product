const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  let find = { deleted: false };
  const records = await Role.find(find);
  res.render("admin/pages/role/index.pug", {
    titlePage: "Nhóm quyền",
    records: records,
  });
};
module.exports.create = (req, res) => {
  res.render("admin/pages/role/create.pug", {
    titlePage: "Thêm mới nhóm quyền",
  });
};
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    let find = { _id: id, deleted: false };
    const data = await Role.findOne(find);

    res.render("admin/pages/role/edit.pug", {
      titlePage: "Chỉnh sửa nhóm quyền",
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  try {
    await Role.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
  }
  res.redirect("back");
};
module.exports.deleteRole = async (req, res) => {
  const id = req.params.id;

  await Role.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
  res.redirect("back");
};
module.exports.permissions = async (req, res) => {
  const find = { deleted: false };
  const records = await Role.find(find);
  res.render("admin/pages/role/permissions.pug", {
    titlePage: "Phân quyền",
    records: records,
  });
};
module.exports.permissionsPatch = async (req, res) => {
  const permission = JSON.parse(req.body.permissions);

  for (const item of permission) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permission });
  }
  req.flash("success", "Bạn đã cấp quyền thành công");
  res.redirect("back");
};
