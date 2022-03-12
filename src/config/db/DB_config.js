const mongoose = require("mongoose");

function DB_config() {
  mongoose
    .connect(process.env.DB_URL, {})
    .then((db) => console.log(`connected to database`))
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
}

module.exports = DB_config;
