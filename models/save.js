const mongoose = require("mongoose");
const { Schema } = mongoose;

const saveSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  previousSaveId: {
    type: Schema.Types.ObjectId,
    ref: "saves",
    default: null
  },
  previousManualSaveId: {
    type: Schema.Types.ObjectId,
    ref: "saves",
    default: null
  },
  projectId: { type: Schema.Types.ObjectId, ref: "project", required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  isAuto: { type: Boolean, default: false, required: true },
  revisionIds: {
    type: [{ type: Schema.Types.ObjectId, ref: "revisions", required: true }],
    default: [],
    required: true
  }
});

mongoose.model("saves", saveSchema);
