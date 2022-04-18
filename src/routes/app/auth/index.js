const { Router } = require("express");
const { MoshaverSchema, AmlakiSchema } = require("../../../model/auth/User");
const { getPath } = require("../../../utils/getPath");
const app = Router();
const sharp = require('sharp');

app.post("/register/moshaver", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.files?.passport)
      return res.status(400).json({
        errors: ["عکس کارت ملی را فراموش کردید !"],
      });

    let passport = req.files?.passport;
    const { name, family, phoneNumber, nationalCode, address } = req.body;
    console.log(req.body);
    console.log(req);
    const admin = await MoshaverSchema.findOne({ phoneNumber });
    if (admin)
      return res.status(400).json({ errors: ["قبلا ثبت نام انجام شده است !"] });

    const checkImage = (data) =>
      data?.mimetype === "image/jpeg" ||
      data?.mimetype === "image/png" ||
      data?.mimetype === "image/jpg";

    if (checkImage(passport)) {
      await sharp(passport.data)
        .jpeg({ quality: 60 })
        .toFile(getPath(`public/uploads/${passport.md5 + passport.name}.jpg`))
        .catch((err) => console.log(err));
      // avatar?.mv(
      //   getPath(`public/uploads/${avatar.md5 + avatar?.name}.jpg`),
      //   (err) => {
      //     console.log(err);
      //   }
      // );
    } else {
      return res.status(400).json({
        errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
      });
    }

    await MoshaverSchema.create({
      ...req.body,
      passport: passport ? passport.md5 + passport.name + ".jpg" : "",
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
