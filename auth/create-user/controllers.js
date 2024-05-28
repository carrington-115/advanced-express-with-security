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
    // const salts = bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, 12);
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
    // const salts = bcrypt.genSalt(12);
    const user = await db.collection("users").findOne({ email: email });
    const dbPassword = user?.password;
    const passwordMatch = await bcrypt.compare(password, dbPassword);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User has logged in" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerUser, loginUsers };
