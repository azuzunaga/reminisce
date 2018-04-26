const mongoose = require("mongoose");
const { Schema } = mongoose;

const activeDraftSchema = new Schema({
  projectId: {type: Schema.Types.ObjectId, ref: "projects", require: true},
  draftId: {type: Schema.Types.ObjectId, ref: "drafts", require: true}
});

const userSchema = new Schema({
  googleId: { type: String, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  firstName: String,
  lastName: String,
  imageUrl: String,
  projectsActiveDraft: [activeDraftSchema]
});

mongoose.model("users", userSchema);
