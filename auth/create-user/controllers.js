const bcrypt = require("bcrypt");

const registerUser = async (req, res, db) => {
  try {
    const { name, email, password } = req.body;
    const user = await db
      .collection("users")
      .findOne({ name: name, email: email });

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "User already exists" });
    }
    const salts = bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salts);
    await db.collection("users").insertOne({
      name: name,
      email: email,
      password: passwordHash,
    });
    return res
      .status(200)
      .json({ success: true, message: "User was successfully recreated" });
  } catch (error) {
    console.error(error);
  }
};

const loginUsers = async (req, res, db) => {
  try {
    const { email, password } = req.body;
    const salts = bcrypt.genSalt(12);
    const passFromBcrypt = await bcrypt.hash(password, salts);
    const user = await db.collection("users").findOne({ email: email });
    const dbPassword = user?.password;
    const passwordMatch = await bcrypt.compare(dbPassword, passFromBcrypt);
    if (passwordMatch) {
      return res
        .status(200)
        .json({ success: true, message: "User has logged in" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Password does not match" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerUser, loginUsers };
