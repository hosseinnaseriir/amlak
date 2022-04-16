const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const RealStateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  consultants: {
    type: Array,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lang: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const RealState = mongoose.model("RealState", RealStateSchema);
module.exports = RealState;
