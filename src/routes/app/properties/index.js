const { Router } = require("express");
const Property = require("../../../model/property/Property");
const { checkImage } = require("../../../utils/checkImage"); 
const sharp = require("sharp");
const { getPath } = require("../../../utils/getPath");

const app = Router();

app.post("/add", async (req, res) => {
  try {
    const pictures = [];
    if (!req.files)

      return res.status(400).json({ errors: ["عکس آگهی را فراموش کردید !"] });
    if (Array.isArray(req?.files?.pictures)) {
      req.files.pictures.map(async (pic) => {
        if (checkImage(pic)) {
          pictures.push(`${pic.md5 + pic.name}.jpg`);
          await sharp(pic.data)
            .jpeg({ quality: 60 })
            .toFile(getPath(`public/uploads/${pic.md5 + pic.name}.jpg`))
            .catch((err) => {
              return res.status(400).json({
                errors: ["مشکلی در آپلود عکس پیش آمد !"],
                serverError: err,
              });
            });
        } else {
          return res.status(400).json({
            errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
          });
        }
      });
      await Property.create({ ...req.body, pictures });
      res.status(201).json({ message: "آگهی جدید با موفقیت ثبت شد !" });
    } else {
      if (checkImage(req.files.pictures)) {
        pictures.push(
          `${req.files.pictures.md5 + req.files.pictures.name}.jpg`
        );
        await sharp(req.files.pictures.data)
          .jpeg({ quality: 60 })
          .toFile(
            getPath(
              `public/uploads/${
                req.files.pictures.md5 + req.files.pictures.name
              }.jpg`
            )
          )
          .catch((err) => {
            return res.status(400).json({
              errors: ["مشکلی در آپلود عکس پیش آمد !"],
              serverError: err,
            });
          });
        await Property.create({ ...req.body, pictures });
        res.status(201).json({ message: "آگهی جدید با موفقیت ثبت شد !" });
      } else {
        return res.status(400).json({
          errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
        });
      }
    }
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
