const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const Cart = require("../../models/cart.models");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
module.exports.register = async (req, res) => {
  res.render("client/pages/user/index.pug", {
    titlePage: "Đăng ký tài khoản",
  });
};
module.exports.registerPost = async (req, res) => {
  const exitsEmail = await User.findOne({
    email: req.body.email,
  });
  if (exitsEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  user.save();
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login.pug", {
    titlePage: "Đăng nhập ",
  });
};
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email, deleted: false });
  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }
  if (!password) {
    req.flash("error", "Mật khẩu không đúng");
    res.redirect("back");
    return;
  }
  if (user.status === "inactive") {
    req.flash("error", "Tài khoản đã bị khóa");
    res.redirect("back");
    return;
  }
  const cart = await Cart.findOne({ user_id: user.id });
  if (cart) {
    res.cookie("cart", cart.id);
  } else {
    await Cart.updateOne({ _id: req.cookies.cartId }, { user_id: user.id });
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.clearCookie("cartId");
  res.redirect("/");
};
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password.pug", {
    titlePage: "Lấy mật khẩu",
  });
};

module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email, deleted: false });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  const otp = generateHelper.generateRandomNumber(4);
  const objForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now(),
  };
  const forgotPassword = new ForgotPassword(objForgotPassword);
  await forgotPassword.save();
  const subject = "Mã OTP xác minh lấy lại mật khẩu ";
  const html = `Mã OTP để lấy lại mật khẩu là <b style="color:blue"> ${otp}</b> .Thời hạn sử dụng là 3 phút`;
  sendMailHelper.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};

module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password.pug", {
    titlePage: "Nhận otp",
    email: email,
  });
};
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const result = await ForgotPassword.findOne({ email: email, otp: otp });

  if (!result) {
    req.flash("error", "Mã otp không tồn tại");
    res.redirect("back");
    return;
  }
  const user = await User.findOne({
    email: email,
  });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
};

module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset.pug", {
    titlePage: "Đổi mật khẩu",
  });
};
module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;
  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    { password: md5(password) }
  );
  res.redirect("/");
};
module.exports.info = async (req, res) => {
  res.render("client/pages/user/info.pug", {
    titlePage: "Trang thông tin cá nhân",
  });
};
