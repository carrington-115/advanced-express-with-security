// this file is for all the server controller functions

const userRegistration = (req, res) => {
  const { username, email, password } = req.body;
  console.log("user data:", username, email, password);
  if (username || email || password) {
    return res.json({
      success: true,
      data: { username: username, email: email, password: password },
    });
  }
  res.send("hello user");
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

module.exports = { userRegistration, userLogin };
