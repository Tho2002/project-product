const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
module.exports.index = async (req, res) => {
  let find = { deleted: false };

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};
module.exports.create = async (req, res) => {
  let find = { deleted: false };

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const records = new ProductCategory(req.body);

  await records.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductCategory.findOne({ _id: id, deleted: false });
    const records = await ProductCategory.find({ deleted: false });

    res.render("admin/pages/product-category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      records: records,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await ProductCategory.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
  }
  res.redirect("back");
};
module.exports.delete = async (req, res) => {
  const id = req.params.id;

  await ProductCategory.updateOne(
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
