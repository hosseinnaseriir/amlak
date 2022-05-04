const { Router } = require("express");
const Contact = require("../../../model/common/ContactForm");

const app = Router();

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    await Contact.create({ ...req.body });
    res.status(200).json({ message: "پیام شما با موفقیت دریافت شد !" });
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
