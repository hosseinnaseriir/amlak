const { Router } = require("express");
const Property = require("../../../model/property/Property");
const { checkImage } = require("../../../utils/checkImage");
const sharp = require("sharp");
const { getPath } = require("../../../utils/getPath");

const app = Router();
const getProperies = app.get("/", async (req, res) => {
  try {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const properties = await Property.find()
      .all()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    const allPropertiesCount = await Property.find().all();
    res.status(200).send({
      properties,
      count: allPropertiesCount.length,
    });
  } catch (ex) {
    console.log(ex.message.errrors);
  }
});

const searchProperies = app.post("/search", async (req, res) => {
  try {
    const properties = await Property.find({
      city,
      area,
      type,
      assignmentType,
      price: { $lt: 20, $gt: 5 },
    })
      .all()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.status(200).send({
      properties,
    });
  } catch (ex) {
    console.log(ex.message.errrors);
  }
});

const addNewProperty = app.post("/add", async (req, res) => {
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

module.exports = {
  add: addNewProperty,
  get: getProperies,
  find: searchProperies,
};
