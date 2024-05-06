const Cart = require("../../models/cart.models");
const Bikelist = require("../../models/product.model");
const productHelper = require("../../helpers/products");
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId,
  });

  const exitsProductInCart = cart.products.find(
    (item) => item.product_id == productId
  );
  if (exitsProductInCart) {
    const quantityNew = parseInt(quantity) + exitsProductInCart.quantity;

    await Cart.updateOne(
      { _id: cartId, "products.product_id": productId },
      { $set: { "products.$.quantity": quantityNew } }
    );
  } else {
    const objCart = {
      product_id: productId,
      quantity: quantity,
    };
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $push: { products: objCart },
      }
    );
  }

  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng");
  res.redirect("back");
};
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;

      const productInfo = await Bikelist.findOne({
        _id: productId,
      }).select("title thumbnail slug price discountPercentage");
      productInfo.priceNew = productHelper.priceNewProduct(productInfo);
      item.productInfo = productInfo;
      item.totalPrice = productInfo.priceNew * item.quantity;
    }
  }
  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.quantity * item.totalPrice,
    0
  );

  res.render("client/pages/cart/index", {
    titlePage: "Giỏ hàng",
    cartDetail: cart,
  });
};
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;

  const productId = req.params.productId;

  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      $pull: { products: { product_id: productId } },
    }
  );

  req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng");
  res.redirect("back");
};
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;

  const productId = req.params.productId;
  const quantity = req.params.quantity;
  await Cart.updateOne(
    { _id: cartId, "products.product_id": productId },
    { $set: { "products.$.quantity": quantity } }
  );
  req.flash("success", "Cập nhật số lượng sanr phẩm thành công");
  res.redirect("back");
};
