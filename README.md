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
  if (!user.isModified("passworcleard")) return next();

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

- For authenticating users, one of the tools we can use is bcrypt since it provides a method to hash the password then compare the user password with the previous password. We also used the email-validator module to check if the email was valid.

- **Cookies and Sessions**: Cookies and sessions are one of the building blocks for making authentication secured on the app, server, and database.

- We can set certain parameters for cookie: `id, expiry date, security (if we want to allow the client to read the cookie)`.
- To use cookie we need the `cookie-parser`. It is a 3rd party package, but it is available in express. When put on the right position, it allows the server to read the cookie header from the routes using `req.cookie`

```javascript
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(cookieParser()); // req.cookie ==> to get the cookie header
```

- Express session is used to manage express session data. `express-session` gives the ability to store the data on the backend. Express session uses `connect-mongo` to connect with a mongodb database.

**_modules needed_**

- express
- cookie-parser
- express-session
- connect-mongo

### **Passport in Nodejs**

- Passport is the most used package for nodejs. It provides an authentication function that uses strategies to authenticate the user. To install passport `npm install --save passport`
- passport does not only makes the authentication process easy, but it also handles storing the login info in the cookies and it does not have to be done manually by the programmer.
- Passport provides 2 functions that make the authentication process easy

```javascript
const passport = require("passport");
passport.initialise();
passport.session();
```

- When dealing with authentication from a local database, we need a tool to interact passport with that database, for this we use `npm install --save passport-local`.
- After installing this tool, we have to use we have to setup a local strategy to use the passport elements in the passport middleware. In this middleware, we then write and async function that can authenticate the user with the database.
- The next step is to write a serialization and deserialization the user data with passport.

```javascript
const passport = require("passport");
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await accountsCollection.findOne({ _id: id });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
```

- Mongoose and passport maintains a global state thereby distributing their models, variables, functions when the moduled is imported anywhere in the project.

### How to setup the MongoDB connection with nodejs and express

- First import all the resources need: mongodb client, express, express session, cookie-parser, connect-mongo

- Set the client and dbName variables
- Set the middleware with app.use and pass all the middlewares

```javascript
const { MongoClient } = require("mongodb");
const client = new MongoClient(dbUrl);
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("mongo-connect");
const express = require("express");
const app = express();

app.use([
  express.json(),
  express.urlencoded(
    { extended: true },
    session({
      secret: "my secret key",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ client: client, dbName: dbName }),
      cookie: { secure: false },
    })
  ),
]);
```

### Combining all the packages and using with passport

- To work with passport we need the following packages

1. mongodb
2. express
3. express-session
4. cookie-parser and body-parser
5. passport-local
6. mongo-connect

### Sending files on a form

- First, on the form attribute `enctype` and set it to `multipart/form-data`

```html
<form actions="" method="post" enctype="multipart/form-data"></form>
```

- To hanlde these files in the form in express, we have to use a middle and we can use that from an npm package `multer`.

```bash
npm install multer
```

- multer allows the configuration of file size, for example

```javascript
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports = multer;
```

- We can now import this middleware in the file to be used and pass it to the route.

```javascript
const multer = require("../middlewares");
const express = require("express");
const app = express();

app.post('/registration',multer.single(<fieldname>) ,(req, res)=>{
  res.end()
})

```

- When dealing with files like images, we must also handle the file extension carefully to make sure that it fits the app backend.
- We can use the `sharp` module when dealing with images. This allows us to resize the image and convert the image to png since it is the best to work with on the internet.
