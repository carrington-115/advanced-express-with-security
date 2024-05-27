// this file is for all the server controller functions

const userRegistration = (req, res) => {
  if (req.url == "/user/registration") {
    res.send("Hello user");
  }
};

module.exports = { userRegistration };
