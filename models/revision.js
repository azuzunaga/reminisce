const mongoose = require("mongoose");
const { Schema } = mongoose;

const revisionSchema = new Schema({
  body: { type: Object, required: true },
  title: { type: String, required: true, index: { unique: true } },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  createdAt: { type: Date, default: Date.now, required: true }
});

mongoose.model("revisions", revisionSchema);
