const { Router } = require("express");
const sharp = require("sharp");
const Article = require("../../../model/articles/Article");
const { checkImage } = require("../../../utils/checkImage");
const { getPath } = require("../../../utils/getPath");

const app = Router();

app.post("/add", async (req, res) => {
  try {
    const { title, summary, text } = req.body;

    if (!req.files?.articleImage)
      return res.status(400).json({
        errors: ["عکس شناسه را فراموش کردید !"],
      });
    let articleImage = req.files?.articleImage;
    if (checkImage(articleImage)) {
      await sharp(articleImage.data)
        .jpeg({ quality: 60 })
        .toFile(getPath(`public/uploads/${articleImage.md5 + articleImage.name}.jpg`))
        .catch((err) => console.log(err));
    } else {
      return res.status(400).json({
        errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
      });
    }

    await Article.create({ title, summary, text,
      articleImage: articleImage ? articleImage.md5 + articleImage.name + ".jpg" : "",
    
    });
    res.status(201).json({ message: "مقاله جدید با موفقیت ثبت شد !" });
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
