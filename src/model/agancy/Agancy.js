const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const AgancySchema = new Schema({
  title: {
    type: String,
    required: [true, " تیتر الزامی است "],
  },
  rate: {
    type: String,
  },
  image: {
    type: String,
    // required: [true , 'عکس الزامی است'],
  },
});

const Agancy = mongoose.model("Agancy", AgancySchema);
module.exports = Agancy;
