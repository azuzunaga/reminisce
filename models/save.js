const mongoose = require("mongoose");
const { Schema } = mongoose;

const saveSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  previousSaveId: { type: Schema.Types.ObjectId, ref: "saves", required: true },
  comment: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "project", required: true },
  draftId: { type: Schema.Types.ObjectId, ref: "draft", required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  isAuto: { type: Boolean, default: false, required: true },
  revisionIds: {
    type: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
    default: [],
    required: true
  }
});

mongoose.model("saves", saveSchema);