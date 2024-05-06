module.exports.registerPost = (req, res, next) => {
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
module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng điền đầy đủ họ tên");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng điền đầy đủ email");
    res.redirect("back");
    return;
  }

  next();
};
module.exports.forgotPassWord = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng điền đầy đủ họ tên");
    res.redirect("back");
    return;
  }

  next();
};
module.exports.resetPassWord = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", "Vui lòng điền mật khẩu");
    res.redirect("back");
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("error", "Vui lòng điền mật khẩu");
    res.redirect("back");
    return;
  }
  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", "Mật khẩu không khớp");
    res.redirect("back");
    return;
  }
  next();
};
