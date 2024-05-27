// this file is for all the server controller functions
const UserModel = require("../data/userSchema");

const userRegistered = (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "User was successfully created" });
};

const userRegistration = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await createUserModel(username, email, password);
    const savedUser = await user.save();
    if (savedUser) return res.redirect("/users/registration/success");
    else return next(Error("Failed to save user"));
  } catch (error) {
    return next(error);
  }
};

const createUserModel = async (name, email, password) => {
  try {
    const user = new UserModel({
      username: name,
      email: email,
      password: password,
    });

    return user;
  } catch (error) {
    console.error(error);
  }
};

const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (email || password) {
    return res.json({
      success: true,
      data: { email: email, password: password },
    });
  }
  res.send("hello user");
};

module.exports = { userRegistered, userRegistration, userLogin };
