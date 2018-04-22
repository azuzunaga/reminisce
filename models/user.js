const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  username: String,
  firstName: String,
  lastName: String,
  imageUrl: String
});

mongoose.model("users", userSchema);
