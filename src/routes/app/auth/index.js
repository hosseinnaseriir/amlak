const { Router } = require("express");
const { MoshaverSchema, AmlakiSchema } = require("../../../model/auth/User");
const { getPath } = require("../../../utils/getPath");
const app = Router();
const sharp = require("sharp");
const { checkImage } = require("../../../utils/checkImage");

app.post("/register/moshaver", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.files?.passport)
      return res.status(400).json({
        errors: ["عکس کارت ملی را فراموش کردید !"],
      });
    let passport = req.files?.passport;
    const { phoneNumber } = req.body;
    const admin = await MoshaverSchema.findOne({ phoneNumber });
    if (admin)
      return res.status(400).json({ errors: ["قبلا ثبت نام انجام شده است !"] });

    if (checkImage(passport)) {
      await sharp(passport.data)
        .jpeg({ quality: 60 })
        .toFile(getPath(`public/uploads/${passport.md5 + passport.name}.jpg`))
        .catch((err) => console.log(err));
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
    if (!req.files?.passport)
      return res.status(400).json({
        errors: ["عکس کارت ملی را فراموش کردید !"],
      });
    if (!req.files?.certificate)
      return res.status(400).json({
        errors: ["عکس پروانه کسب را فراموش کردید !"],
      });
      
    let passport = req.files?.passport;
    let certificate = req.files?.certificate;

    const { phoneNumber } = req.body;
    console.log(req.body);
    const admin = await AmlakiSchema.findOne({ phoneNumber });
    if (admin)
      return res.status(400).json({ errors: ["قبلا ثبت نام انجام شده است !"] });

    if (checkImage(passport)) {
      await sharp(passport.data)
        .jpeg({ quality: 60 })
        .toFile(getPath(`public/uploads/${passport.md5 + passport.name}.jpg`))
        .catch((err) => console.log(err));
    } else {
      return res.status(400).json({
        errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
      });
    }

    if (checkImage(certificate)) {
      await sharp(certificate.data)
        .jpeg({ quality: 60 })
        .toFile(
          getPath(`public/uploads/${certificate.md5 + certificate.name}.jpg`)
        )
        .catch((err) => console.log(err));
    } else {
      return res.status(400).json({
        errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
      });
    }

    await AmlakiSchema.create({
      ...req.body,
      passport: passport ? passport.md5 + passport.name + ".jpg" : "",
      certificate: certificate
        ? certificate.md5 + certificate.name + ".jpg"
        : "",
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
