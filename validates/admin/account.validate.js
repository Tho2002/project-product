module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng điền đầy đủ họ tên");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng điền đầy đủ email");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng điền đầy đủ mật khẩu");
    res.redirect("back");
    return;
  }
  next();
};
module.exports.editPatch = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng điền đầy đủ họ tên");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng điền đầy đủ email");
    res.redirect("back");
    return;
  }

  next();
};
