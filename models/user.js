const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      trim: true,
    },
    message: {
      type: String,
      default: null,
      trim: true,
    },
    phone: {
      type: Number,
      default: null,
    },
    pinCode: {
      type: String,
      default: null,
    },
    files: [
      {
        type: String,
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
