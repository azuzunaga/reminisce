const mongoose = require("mongoose");
const _ = require("lodash");

const Draft = mongoose.model("drafts");
const Save = mongoose.model("saves");

module.exports = app => {
  app.post("/api/drafts", async (req, res) => {
    const draft = await Draft.create(req.body.draft);
    res.json(draft);
  });

  app.get("/api/drafts/:draftId", async (req, res) => {
    const draftOp = Draft.findById(req.params.draftId);
    const savesOp = Save.find({ draftId: req.params.draftId });
    draft = await draftOp;
    saves = await savesOp;
    res.json({ draft, saves: _.keyBy(saves, "_id") });
  });
};
