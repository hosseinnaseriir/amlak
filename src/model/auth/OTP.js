const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const OTPSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    // required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
  expiresdAt: { type: Date, default: Date.now() + 60000},
});
exports.OTPSchema = mongoose.model("OTP", OTPSchema);
