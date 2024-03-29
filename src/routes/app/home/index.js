const { Router } = require("express");
const Agancy = require("../../../model/agancy/Agancy");
const Article = require("../../../model/articles/Article");
const Property = require("../../../model/property/Property");

const app = Router();

app.get("/", async (req, res) => {
  try {
    const articles = await Article.find().limit(3);
    const properties = await Property.find();
    const agancies = await Agancy.find();
    res.status(200).json({ agancies , articles, properties });
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
