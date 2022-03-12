const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

