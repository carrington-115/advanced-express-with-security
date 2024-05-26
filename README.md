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
