const { validateEmail } = require("./emailValidator");
const testEmail = "markcarrington@gmail.com";

const main = async () => {
  try {
    const val = await validateEmail(testEmail);
    console.log("The value is", val);
    if (val === true) console.log(`${testEmail} is valid`);
    else console.log(`${testEmail} is invalid`);
  } catch (error) {
    console.error(error);
  }
};

main();
