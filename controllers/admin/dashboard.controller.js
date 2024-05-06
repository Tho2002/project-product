// [GeT] / admin / dashboard; //
const ProductCategory = require("../../models/product-category.model");
const Bikelist = require("../../models/product.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    bikelist: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };
  statistic.categoryProduct.total = await ProductCategory.countDocuments({
    deleted: false,
  });
  statistic.categoryProduct.active = await ProductCategory.countDocuments({
    status: "active",
    deleted: false,
  });
  statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
    status: "inactive",
    deleted: false,
  });
  statistic.bikelist.total = await Bikelist.countDocuments({
    deleted: false,
  });
  statistic.bikelist.active = await Bikelist.countDocuments({
    status: "active",
    deleted: false,
  });
  statistic.bikelist.inactive = await Bikelist.countDocuments({
    status: "inactive",
    deleted: false,
  });
  statistic.account.total = await Account.countDocuments({
    deleted: false,
  });
  statistic.account.active = await Account.countDocuments({
    status: "active",
    deleted: false,
  });
  statistic.account.inactive = await Account.countDocuments({
    status: "inactive",
    deleted: false,
  });
  statistic.user.total = await User.countDocuments({
    deleted: false,
  });
  statistic.user.active = await User.countDocuments({
    status: "active",
    deleted: false,
  });
  statistic.user.inactive = await User.countDocuments({
    status: "inactive",
    deleted: false,
  });
  res.render("admin/pages/dashboard/index.pug", { statistic: statistic });
};
