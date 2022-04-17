const { Router } = require("express");
const { MoshaverSchema, AmlakiSchema } = require("../../../model/auth/User");

const app = Router();

app.post("/register/moshaver", async (req, res) => {
  try {
    const { name, family, phoneNumber, nationalCode, address, passport } =
      req.body;
    console.log(req.files); // the uploaded file object
    console.log(req.body);
    const admin = await MoshaverSchema.findOne({ phoneNumber });
    if (admin)
      return res.status(400).json({ errors: ["قبلا ثبت نام انجام شده است !"] });
    await MoshaverSchema.create({
      name,
      family,
      phoneNumber,
      nationalCode,
      address,
      passport:'tesyy',
    });
    res.status(201).json({ message: "حساب شما با موفقیت ساخته شد!" });
  } catch (ex) {
    let errors = ex.message.split(",").map((item) => {
      let error = item.split(":");
      return error[error.length - 1];
    });
    res.status(400).json({ errors });
    console.log(errors);
  }
});

app.post("/register/amlak", async (req, res) => {
  try {
    const {
      name,
      family,
      phoneNumber,
      nationalCode,
      address,
      passport,
      certificate,
      lat,
      lon,
    } = req.body;
    console.log(req.body);
    const admin = await AmlakiSchema.findOne({ phoneNumber });
    if (admin)
      return res.status(400).json({ errors: ["قبلا ثبت نام انجام شده است !"] });
    await AmlakiSchema.create({
      name,
      family,
      phoneNumber,
      nationalCode,
      address,
      passport,
      certificate,
      lat,
      lon,
    });
    res.status(201).json({ message: "حساب شما با موفقیت ساخته شد!" });
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
