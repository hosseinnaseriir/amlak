const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const PropertySchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["1", "2"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  metrage: {
    type: Number,
    required: true,
  },
  assignmentType: {
    type: String,
    enum: ["1", "2"],
    required: true,
  },
  bedRooms: {
    type: Number,
    required: true,
  },
  advertiser: {
    type: String,
    required: true,
  },
  realStateCode: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictures: {
    type: [{ type: String }],
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

const Property = mongoose.model("Property", PropertySchema);
module.exports = Property;
