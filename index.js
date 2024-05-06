const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT;
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system");
database.connect();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const moment = require("moment");
const server = http.createServer(app);
const io = new Server(server);
// socket
global._io = io;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(methodOverride("_method"));
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

//Applocals Varialbale
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
app.use(cookieParser("LUUDUCTHO"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
route(app);
routeAdmin(app);
app.get("*", (req, res) => {
  res.render("client/pages/error/404", { titlePage: "trang 404" });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
