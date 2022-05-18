const { Router } = require("express");
const Article = require("../../../model/articles/Article");

const app = Router();

app.get("/", async (req, res) => {
  try {
    const articles = await Article.find().limit(3);
    console.log(articles);
    res.status(200).json({ articles });
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
