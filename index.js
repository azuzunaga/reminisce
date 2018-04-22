const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const routes = require("./routes");
const keys = require("./config/keys");
require("./models");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.get("/", (req, res) => res.send("hi there"));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
