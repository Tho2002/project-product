const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
module.exports.index = async (req, res) => {
  //sản phẩm nổi bật
  const productsFeatured = await Product.find({
    deleted: false,
    featured: "1",
    status: "active",
  }).limit(6);
  const newbikelist = productsHelper.priceNewProducts(productsFeatured);
  ///Sản phẩm mới nhất

  const productsnew = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);
  const newProductFeatured = productsHelper.priceNewProducts(productsnew);
  res.render("client/pages/home/index.pug", {
    titlePage: "Trang chủ",
    productsFeatured: newbikelist,
    newProductFeatured: newProductFeatured,
  });
};
