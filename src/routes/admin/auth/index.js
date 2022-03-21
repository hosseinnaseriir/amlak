const { Router } = require("express");
const Admin = require("../../../model/admin/auth/Admin");
const bcrypt = require("bcryptjs");

const app = Router();

app.post("/register", async (req, res) => {
  try {
    const { email, password, repeatPassword } = req.body;
    console.log(req.body);
    const admin = await Admin.findOne({ email });
    if (admin)
      return res.status(400).json({ errors: ["قبلا ثبت نام انجام شده است !"] });
    if (password !== repeatPassword)
      return res
        .status(400)
        .json({ errors: ["رمز عبور و تکرار آن یکسان نیست !"] });
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);

    await Admin.create({ email, password: pass, repeatPassword: pass });
  } catch (ex) {
    let errors = ex.message.split(",").map((item) => {
      let error = item.split(":");
      return error[error.length - 1];
    });
    res.status(400).json({ errors });
    console.log(errors);
  }
});

app.post("/login", async (req, res) => {
  try {
  } catch (ex) {
    let errors = ex.message.split(",").map((item) => {
      let error = item.split(":");
      return error[error.length - 1];
    });
    res.status(400).json({ errors });
    console.log(errors);
  }
});

module.exports = app;
