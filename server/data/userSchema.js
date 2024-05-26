const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

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

userSchema.pre("save", async function preSave(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (error) {
    return next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
