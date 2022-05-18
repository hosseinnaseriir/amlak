const appRootPath = require("app-root-path");
const express = require("express");
const articlesRoutes = require("./src/routes/app/articles");
const cors = require("cors");
const adminRoutes = require("./src/routes/admin/auth");
const articleRoutes = require("./src/routes/admin/article/index");
const commonRoutes = require("./src/routes/app/common");
const propertyRoutes = require("./src/routes/app/properties");
const appRoutes = require("./src/routes/app/auth");
const homeRoutes = require("./src/routes/app/home");
const fileUpload = require("express-fileupload");
const authenticate = require("./src/middlewares/authenticate");
const app = express();

require("./src/config/env")();
require("./src/config/db/DB_config")();
app.use(cors());
app.use("/static", express.static(appRootPath + "/src/public"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Hello World!"));

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
    },
  })
);

app.use("/articles", articlesRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/article", articleRoutes);
app.use("/auth", appRoutes);
app.use("/contact", commonRoutes);
app.use("/property", authenticate , propertyRoutes.add);
app.use("/properties", propertyRoutes.get);
app.use("/properties", propertyRoutes.find);
app.use("/home", homeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

