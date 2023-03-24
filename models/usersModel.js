const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  userName: {
    type: String,
    required: true,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("users", userSchema);
