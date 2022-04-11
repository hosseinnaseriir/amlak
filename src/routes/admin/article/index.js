const { Router } = require("express");
const Article = require("../../../model/articles/Article");

const app = Router();

app.post("/add", async (req, res) => {
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

module.exports = app;
