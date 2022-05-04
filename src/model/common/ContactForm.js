const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const ContactSchema = new Schema({
  fullName: {
    type: String,
    required: [true, " نام شما الزامی است "],
  },
  email: {
    type: String,
    required: [true, " ایمیل شما الزامی است "],
  },
  title: {
    type: String,
    required: [true, " تیتر الزامی است "],
  },
  description: {
    type: String,
    required: [true, " متن پیام الزامی است "],
  },  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
