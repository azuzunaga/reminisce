const mongoose = require("mongoose");
const { Schema } = mongoose;

const draftSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "projects", required: true },
  saveIds: {
    type: [{ type: Schema.Types.ObjectId, ref: "saves", required: true }],
    default: [],
    required: true
  },
  description: String,
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true }
});

draftSchema.index({ name: 1, projectId: 1 }, { unique: true });

mongoose.model("drafts", draftSchema);
