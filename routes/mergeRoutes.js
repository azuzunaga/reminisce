const mongoose = require("mongoose");
const _ = require("lodash");

const Draft = mongoose.model("drafts");
const Save = mongoose.model("saves");
const Revision = mongoose.model("revisions");

module.exports = app => {
  app.get("/api/merge", async (req, res) => {
    const mainDraft = await Draft.findById(req.query.mainDraftId);
    const mergeDraft = await Draft.findById(req.query.mergeDraftId);
    console.log(mainDraft);
    console.log(mergeDraft);
    const minLength = Math.min(
      mainDraft.saveIds.length,
      mergeDraft.saveIds.length
    );
    let i = 0;
    while (i < minLength && mainDraft.saveIds[i].toString() === mergeDraft.saveIds[i].toString()) {
      i++;
    }
    if (i === 0) {
      return res
        .status(422)
        .json(["Can't merge drafts with unrelated histories"]);
    }
    const parentSave = await Save.findById(mainDraft.saveIds[i - 1]);
    const mainSave = await Save.findById(mainDraft.saveIds[mainDraft.saveIds.length - 1]);
    const mergeSave = await Save.findById(mergeDraft.saveIds[mergeDraft.saveIds.length - 1]);
    const revisionIds = parentSave.revisionIds.concat(mainSave.revisionIds).concat(mergeSave.revisionIds);
    const revisions = await Revision.find({ _id: { $in: revisionIds } }) || [];
    res.json({ mainSave, mergeSave, parentSave, revisions: _.keyBy(revisions, "_id") });
  });
}
