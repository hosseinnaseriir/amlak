const { Router } = require("express");
const Admin = require("../../../model/admin/auth/Admin");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../../../config/email");
var jwt = require("jsonwebtoken");

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
    const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    await sendEmail(
      "pagehnsri@gmail.com",
      "ایمیل تایید ادمین جدید",
      `برای تایید ایمیل 
    ${email}
    روی لینک زیر کلیک کنید 
    <a href="${process.env.BASE_URL}/admin/confirm-admin?token=${token}"></a>
    `
    );
    await Admin.create({ email, password: pass, repeatPassword: pass });
    res.status(201).json({ message: "ایمیل توسط ادمین تایید شود !" });
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
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ errors: ["ایمیل پیدا نشد!"] });
    const pass = await bcrypt.compare(password, admin.password);
    if (!pass)
      return res.status(400).json({ errors: ["ایمیل یا پسورد اشتباه است !"] });
    const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET, {
      expiresIn: 24 * 24 * 24,
    });
    res.status(200).json({ message: ["با موفقیت وارد شدید !"], token });
  } catch (ex) {
    let errors = ex.message.split(",").map((item) => {
      let error = item.split(":");
      return error[error.length - 1];
    });
    res.status(400).json({ errors });
    console.log(errors);
  }
});

app.get("/confirm-admin", async (req, res) => {
  console.log(req.query);
});

module.exports = app;
