module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng điền đầy đủ tiêu đề thông tin sản phẩm");
    res.redirect("back");
    return;
  }
  next();
};
