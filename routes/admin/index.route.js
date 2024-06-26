const systemConfig = require("../../config/system");
const authMiddleWare = require("../../middlewares/admin/auth.middleware");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");
const myAccountRoute = require("./my-account.route");
const settingRoute = require("./setting.route");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleWare.requireAuth,
    dashboardRoutes
  );
  app.use(PATH_ADMIN + "/products", authMiddleWare.requireAuth, productRoutes);
  app.use(
    PATH_ADMIN + "/products-category",
    authMiddleWare.requireAuth,
    productCategoryRoutes
  );
  app.use(PATH_ADMIN + "/roles", authMiddleWare.requireAuth, roleRoutes);
  app.use(PATH_ADMIN + "/accounts", authMiddleWare.requireAuth, accountRoutes);
  app.use(
    PATH_ADMIN + "/my-account",
    authMiddleWare.requireAuth,
    myAccountRoute
  );
  app.use(PATH_ADMIN + "/auth", authRoutes);
  app.use(PATH_ADMIN + "/settings", authMiddleWare.requireAuth, settingRoute);
};
