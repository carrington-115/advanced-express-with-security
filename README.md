# advanced-express-with-security

## Express course

- Express is mostly popular because of 3 main things, the routes, middleware, and request-response
- Express have some import middleware
  _body-parser_: To parse http request body
  _compression_: To compress http responses
  _cookie-parser_: parse cookie header and populate req.cookies
  _multer_: handle multipart form data
  *serve-favicon*z; serve a favicon
  _session_: establish server-based sessions (development only)
  _helmet_: for securing an app
  _passport_: for authentication using strategies such as OAuth, OpenID, and many others

## Using template engines

- We use app.engine to pass templates to the app
- When using databases, it is good to have a test, production, and development database

## Mongoose

- Installation

```bash
npm install --save mongoose
```

- **Connecting with the MongoDB client**:

```javascript
const mongoose = require("mongoose");

module.exports.connectDatabase = async (dbUrl) =>
  mongoose.connect(dbUrl, { useNewUrlParser: true });

// to run the code
const { connectDatabase } = require("./db");
connnectDatabase.connect(dbUrl).then().catch();
```

- **Data Schema in Mongoose**: Mongoose allows the database developers to create schemas for their databases. This can be done using the mongoose schema method from mongoose. When using emails in the schema, we can use the email validator module to check if our email is valid or not.

```javascript
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      require: true,
      index: { unique: true },
      trim: true,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("User", userSchema);
```

## Security in the Node application

### **Using bcrypt to Hash and Compare Passwords**: It is bad practice to store password in plaintext. So we use a tool to store the password as a hash. We use a tool called bcrypt for this. Bycrypt hash has the structure: `version | Rounds | Salt | Hash`. To find out if the a password is correct, bcrypt gives a function that compares the hash of the entered password to the stored hash.

```javascript
console.log("hello world");
```

- **Installing bcrypt**:

```bash
npm install --save bcrypt
```

- **Initialising bcrypt**: import bcrypt with the require function, then pass the salt rounds. Then we have to write 2 pieces of code for the hashing of the password and the comparing of the password.

```javascript
const bcrypt = require("bcrypt");

// getting the hash
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

// compare function
userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
```
