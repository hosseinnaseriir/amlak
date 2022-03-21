const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const AdminSchema = new Schema({
  email: {
    type: String,
    required: [true, " ایمیل الزامی است "],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "ایمیل اشتباه وارد شده است !",
    ],
  },
  password: {
    type: String,
    required: [true, "رمز عبور الزامی است"],
  },
  repeatPassword: {
    type: String,
    required: [true, "تکرار رمز عبور الزامی است"],
  },
  authenticated: {
    type: Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
