const mongoose = require("mongoose");

// const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema;

const roomSchema = new schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    users: [
      {
        userName: {
          type: String,
          required: true,
          ref: "users",
        },
      },
    ],
    duration: {
      type: Number,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("room", roomSchema);
