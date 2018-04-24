const mongoose = require("mongoose");
const { Schema } = mongoose;

const revisionSchema = new Schema({
  body: { type: Object, required: true },
  documentId: { type: Schema.Types.ObjectId, ref: "documents", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  saveId: { type: Schema.Types.ObjectId, ref: "saves", required: true },
  createdAt: { type: Date, default: Date.now, required: true }
});

mongoose.model("revisions", revisionSchema);
