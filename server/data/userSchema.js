const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      lowercase: true,
      validate: {
        validator: emailValidator.validate,
        messate: (props) => `${props.value} is not an email address`,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minLength: 8,
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
