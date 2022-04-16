const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true , ' تیتر الزامی است '],
  },
  summary: {
    type: String,
    // required: [true , 'خلاصه متن الزامی است'],
  },
  text: {
    type: String,
    required: [true , 'متن الزامی است'],
  },
  image: {
    type: String,
    // required: [true , 'عکس الزامی است'],
  },
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;