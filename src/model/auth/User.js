const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
});

const MoshaverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  nationalCode: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
});

const AmlakiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  nationalCode: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lon: {
    type: String,
    required: true,
  },
});

exports.User = mongoose.model("User", UserSchema);
exports.MoshaverSchema = mongoose.model("MoshaverSchema", MoshaverSchema);
exports.AmlakiSchema = mongoose.model("AmlakiSchema", AmlakiSchema);
