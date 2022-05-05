const { Router } = require("express");
const Article = require("../../../model/articles/Article");
const app = Router();

app.post("/", async (req, res) => {
  try {
    const { title, summary, text, image } = req.body;
    await Article.create({ title, summary, text, image });
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

app.get("/", async (req, res) => {
  try {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    let articles = await Article.find()
      .all()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.status(200).send({
      articles,
    });
  } catch (ex) {
    console.log(ex.message.errrors);
  }
});

module.exports = app;
