const mongoose = require("mongoose");
const { Schema } = mongoose;
const { validateUniqueness } = require("../utils/utils");

const projectSchema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  canEdit: {
    type: [{ type: Schema.Types.ObjectId, ref: "users" }],
    default: [],
    required: true
  },
  canView: {
    type: [{ type: Schema.Types.ObjectId, ref: "users" }],
    default: [],
    required: true
  },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
  description: String
});

projectSchema.index({ ownerId: 1, name: 1 }, { unique: true });

projectSchema.methods.canUserEdit = function canUserEdit(userId) {
  return (
    this.ownerId.toString() === userId.toString() ||
    this.canEdit.includes(userId)
  );
};

mongoose.model("projects", projectSchema);
