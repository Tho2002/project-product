module.exports.priceNewProducts = (product) => {
  const newbikelist = product.map((item) => {
    item.pricenew = (
      ((100 - item.discountPercentage) * item.price) /
      100
    ).toFixed(0);

    return item;
  });

  return newbikelist;
};
module.exports.priceNewProduct = (bikelist) => {
  const priceNew = (
    ((100 - bikelist.discountPercentage) * bikelist.price) /
    100
  ).toFixed(0);
  return parseInt(priceNew);
};
