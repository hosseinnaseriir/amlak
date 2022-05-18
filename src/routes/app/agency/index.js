const { Router } = require("express");
const Agancy = require("../../../model/agancy/Agancy");

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
    await Agancy.create({ title, rate, picture });
    res.status(200).json({ message: "آژانس جدید ثبت شد !" });
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
