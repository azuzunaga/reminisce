const mongoose = require("mongoose");
const { Schema } = mongoose;

const documentSchema = new Schema({
  name: { type: String, required: true }
});

mongoose.model("documents", documentSchema);
