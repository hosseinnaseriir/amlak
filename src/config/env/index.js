const appRootPath = require("app-root-path");

function configDotEnv() {
  require("dotenv").config({
    path: appRootPath + "/src/config/env/.env",
  });
}

module.exports = configDotEnv;
