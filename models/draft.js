const mongoose = require("mongoose");
const { Schema } = mongoose;

const draftSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "projects", required: true },
  saveIds: {
    type: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
    default: [],
    required: true
  }
});

mongoose.model("drafts", draftSchema);