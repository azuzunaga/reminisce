const express = require("express");
const mongoose = require("mongoose");
const enforce = require('express-sslify');
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");

const routes = require("./routes");
const keys = require("./config/keys");
require("./models");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

routes(app);

if (process.env.NODE_ENV === "production") {
  // Redirect to https behind Heroku's reverse proxy
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  // Serve up production assets
  app.use(express.static("client/build"));

  // Serve index.html if the route doesn't exist
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
