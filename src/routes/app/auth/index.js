const { Router } = require("express");
const { MoshaverSchema, AmlakiSchema } = require("../../../model/auth/User");
const { getPath } = require("../../../utils/getPath");
const app = Router();
const sharp = require("sharp");
const { checkImage } = require("../../../utils/checkImage");
const Kavenegar = require("kavenegar");
const { OTPSchema } = require("../../../model/auth/OTP");
var jwt = require("jsonwebtoken");

const api = Kavenegar.KavenegarApi({
  apikey:
    "6841684B7A3576694F63544743304F6257666D2F4A7A4F4F4A376367566F745334394236366F2F556748733D",
});

app.post("/register/phone-number", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const verifyCode = Math.floor(Math.random() * 100000);
    await OTPSchema.create({ phoneNumber, otp: verifyCode });
    api.VerifyLookup(
      {
        receptor: phoneNumber,
        token: verifyCode,
        template: "verify",
      },
      function (response, status) {
        console.log(response);
        console.log(status);
      }
    );
    res.status(200).send({ message: "کد تایید با موفقیت ارسال شد !" + verifyCode });
  } catch (ex) {
    let errors = ex.message.split(",").map((item) => {
      let error = item.split(":");
      return error[error.length - 1];
    });
    res.status(400).json({ errors });
    console.log(errors);
  }
});

app.post("/register/phone-number/verify", async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    const verifyed = await OTPSchema.findOne({ phoneNumber, otp });

    if (!verifyed) {
      await OTPSchema.findOneAndDelete({ phoneNumber });
      return res.status(400).json({
        errors: ["احراز هویت تایید نشد !"],
      });
    }

    if (verifyed.expiresdAt < Date.now() + 120000) {
      await OTPSchema.findOneAndDelete({ phoneNumber, otp });
      return res.status(400).json({
        errors: ["کد منقضی شده است !"],
      });
    }

    const isMoshaver = await MoshaverSchema.findOne({ phoneNumber });
    const isAmlak = await AmlakiSchema.findOne({ phoneNumber });

    let token = jwt.sign(
      {
        isMoshaver,
        isAmlak,
        phoneNumber,
        _id: verifyed.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ token });
  } catch (ex) {
    let errors = ex.message.split(",").map((item) => {
      let error = item.split(":");
      return error[error.length - 1];
    });
    res.status(400).json({ errors });
    console.log(errors);
  }
});

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
