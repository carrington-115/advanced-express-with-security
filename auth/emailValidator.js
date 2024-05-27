const emailValidator = require("email-validator");

const validateEmail = async (email) => {
  try {
    const validateResponse = emailValidator.validate(email);
    return validateResponse;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { validateEmail };
