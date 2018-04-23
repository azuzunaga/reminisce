const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, index: { unique: true } },
  username: { type: String, index: { unique: true } },
  firstName: String,
  lastName: String,
  imageUrl: String
});

mongoose.model("users", userSchema);
