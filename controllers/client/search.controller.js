const Bikelist = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  let newBikelist = [];
  const regex = new RegExp(keyword, "i");
  if (keyword) {
    const bikelist = await Bikelist.find({
      title: regex,
      deleted: false,
      status: "active",
    });

    newBikelist = productsHelper.priceNewProducts(bikelist);
  }
  res.render("client/pages/search/index", {
    titlePage: "Kết quả tìm kiếm",
    keyword: keyword,
    bikelist: newBikelist,
  });
};
