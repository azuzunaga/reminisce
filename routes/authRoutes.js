const passport = require("passport");
const keys = require("../config/keys");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.json(req.user);
  });

  app.get("/api/demo_login", (req, res) => {
    req.session = { passport: { user: keys.demoUserId } };
    res.redirect("/");
  });
};
