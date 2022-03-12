const appRootPath = require("app-root-path");
const express = require("express");
const articlesRoutes = require("./src/routes/app/articles");
const app = express();

require("./src/config/env")();
require("./src/config/db/DB_config")();
app.use("/static", express.static(appRootPath + "/src/public"));
app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));

app.use("/articles", articlesRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
