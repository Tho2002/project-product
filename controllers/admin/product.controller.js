const BikeList = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
const Account = require("../../models/account.model");
// [GeT] / admin / products; //
module.exports.product = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  let find = { deleted: false };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const ojbSearch = searchHelper(req.query);
  if (ojbSearch.keyword) {
    find.title = ojbSearch.regex;
  }
  //Pagination
  const countBikeList = await BikeList.countDocuments(find); //dem so luong sp
  const objPagination = paginationHelper(
    { limitItem: 4, currentPage: 1 },
    req.query,
    countBikeList
  );
  //
  //SORT
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  //
  const bikelist = await BikeList.find(find)
    .sort(sort)
    .limit(objPagination.limitItem)
    .skip(objPagination.skip);
  for (const item of bikelist) {
    const user = await Account.findOne({
      _id: item.createBy.account_id,
    });
    if (user) {
      item.accountFullname = user.fullName;
    }
  }
  res.render("admin/pages/product/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    bikelist: bikelist,
    filterStatus: filterStatus,
    keyword: ojbSearch.keyword,
    pagination: objPagination,
  });
};
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;

  await BikeList.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công");
  res.redirect("back");
};
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  switch (type) {
    case "active":
      await BikeList.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", "Cập nhật trạng thái thành công");
      break;
    case "inactive":
      await BikeList.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", "Cập nhật trạng thái thành công");
      break;
    case "delete-all":
      await BikeList.updateMany(
        { _id: { $in: ids } },
        { deleted: true },
        { deleteAt: new Date() }
      );
      req.flash("success", "Xoá sản phẩm thành công");
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await BikeList.updateOne({ _id: id }, { position: position });
      }
      req.flash("success", "Thay đổi vị trí sản phẩm thành công");
      break;

    default:
      break;
  }
  res.redirect("back");
};
///[Delete Item]

module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // await BikeList.deleteOne({ _id: id });///xóa cứng
  await BikeList.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date(),
      },
    }
  );
  req.flash("success", "Xóa sản phẩm thành công");
  res.redirect("back");
};
module.exports.create = async (req, res) => {
  let find = { deleted: false };

  const category = await ProductCategory.find(find);
  const newCategory = createTreeHelper.tree(category);
  res.render("admin/pages/product/create.pug", {
    titlePage: "Thêm mới sản phẩm",
    category: newCategory,
  });
};
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countBikelist = await BikeList.countDocuments();
    req.body.position = countBikelist + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  req.body.createBy = {
    account_id: res.locals.user.id,
  };
  const bike = new BikeList(req.body);
  await bike.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
module.exports.edit = async (req, res) => {
  try {
    const find = { deleted: false, _id: req.params.id };

    const bikelist = await BikeList.findOne(find);

    const category = await ProductCategory.find({ deleted: false });
    const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/product/edit.pug", {
      titlePage: "Chỉnh sửa sản phẩm",
      bikelist: bikelist,
      category: newCategory,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await BikeList.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
  }
  res.redirect("back");
};
module.exports.detail = async (req, res) => {
  try {
    const find = { deleted: false, _id: req.params.id };

    const bikelist = await BikeList.findOne(find);

    res.render("admin/pages/product/detail.pug", {
      titlePage: "Chỉnh sửa sản phẩm",
      bikelist: bikelist,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
