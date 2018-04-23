const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) {
        return done(null, existingUser);
      }

      let imageUrl = profile.photos[0].value;
      imageUrl = imageUrl.slice(0, imageUrl.length - 6);

      const user = await new User({
        googleId: profile.id,
        username: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        imageUrl: imageUrl
      }).save()
      done(null, user);
    }
  )
);
