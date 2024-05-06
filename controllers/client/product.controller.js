const Bikelist = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/products");
const ProductCategoryHelper = require("../../helpers/productCategory");
module.exports.product = async (req, res) => {
  const bikelist = await Bikelist.find({
    deleted: false,
    status: "active",
  }).sort({ position: "desc" });

  const newbikelist = productsHelper.priceNewProducts(bikelist);
  res.render("client/pages/product/index.pug", {
    titlePage: "Danh sách sản phẩm",
    bikelist: newbikelist,
  });
};
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugCategory,
      status: "active",
    };

    const bikelist = await Bikelist.findOne(find);
    if (bikelist.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: bikelist.product_category_id,
        status: "active",
        deleted: false,
      });
      bikelist.category = category;
    }
    bikelist.priceNew = productsHelper.priceNewProduct(bikelist);
    res.render("client/pages/product/detail.pug", {
      titlePage: bikelist.title,
      bikelist: bikelist,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
module.exports.category = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      deleted: false,
      status: "active",
      slug: req.params.slugCategory,
    });

    const listSubCategory = await ProductCategoryHelper.getSubCategory(
      category.id
    );
    const listSubCategoryId = listSubCategory.map((item) => item.id);

    const products = await Bikelist.find({
      product_category_id: { $in: [category.id, ...listSubCategoryId] },
      deleted: false,
    }).sort({ position: "desc" });
    const newbikelist = productsHelper.priceNewProducts(products);

    res.render("client/pages/product/index.pug", {
      titlePage: category.title,
      bikelist: newbikelist,
    });
  } catch (error) {
    res.redirect("/products");
  }
};
