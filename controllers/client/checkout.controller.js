const Bikelist = require("../../models/product.model");
const Cart = require("../../models/cart.models");
const productHelper = require("../../helpers/products");
const Order = require("../../models/order.model");
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

  res.render("client/pages/checkout/index", {
    titlePage: "Đặt hàng",
    cartDetail: cart,
  });
};
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await Cart.findOne({
    _id: cartId,
  });

  const products = [];
  for (const product of cart.products) {
    const objProduct = {
      product_id: product.product_id,
      price: 0,
      quantity: product.quantity,
      discountPercentage: 0,
    };
    const productInfo = await Bikelist.findOne({
      _id: product.product_id,
    }).select("price discountPercentage");
    objProduct.price = productInfo.price;
    objProduct.discountPercentage = productInfo.discountPercentage;
    products.push(objProduct);
  }
  const orderInfo = {
    userInfo: userInfo,
    cart_id: cartId,
    products: products,
  };

  const order = new Order(orderInfo);
  order.save();
  await Cart.updateOne(
    { _id: cartId },
    {
      products: [],
    }
  );
  res.redirect(`/checkout/success/${order.id}`);
};
module.exports.success = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.orderId,
  });

  for (const product of order.products) {
    const productInfo = await Bikelist.findOne({
      _id: product.product_id,
    }).select(" title thumbnail");

    product.productInfo = productInfo;

    product.priceNew = productHelper.priceNewProduct(product);
    product.totalPrice = product.priceNew * product.quantity;
  }
  order.totalPrice = order.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  res.render("client/pages/checkout/success", {
    titlePage: "Đặt hàng thành công",
    order: order,
  });
};
