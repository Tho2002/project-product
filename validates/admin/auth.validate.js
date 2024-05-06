module.exports.auth = (req, res, next) => {
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
