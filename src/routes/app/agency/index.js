const { Router } = require("express");
const sharp = require("sharp");
const Agancy = require("../../../model/agancy/Agancy");
const { checkImage } = require("../../../utils/checkImage");
const { getPath } = require("../../../utils/getPath");

const app = Router();

app.get("/", async (req, res) => {
  try {
    const agancies = await Agancy.find();
    res.status(200).json({ agancies });
  } catch (ex) {
    let errors = ex.message.split(",").map((item) => {
      let error = item.split(":");
      return error[error.length - 1];
    });
    res.status(400).json({ errors });
    console.log(errors);
  }
});

app.post("/add", async (req, res) => {
  try {
    const { title, rate } = req.body;

    if (!req.files?.image)
      return res.status(400).json({
        errors: ["عکس شناسه را فراموش کردید !"],
      });
    const picture = req.files?.image;
    if (checkImage(picture)) {
      await sharp(picture.data)
        .jpeg({ quality: 60 })
        .toFile(
          getPath(`public/uploads/${picture.md5 + picture.name}.jpg`)
        )
        .catch((err) => console.log(err));
    } else {
      return res.status(400).json({
        errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
      });
    }
    await Agancy.create({ title, rate, picture });
    res.status(201).json({ message: "آژانس جدید ثبت شد !" });
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
