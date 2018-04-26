const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const _ = require("lodash");

const { to } = require("../utils/utils");
const Draft = mongoose.model("drafts");
const Save = mongoose.model("saves");
const User = mongoose.model("users");

module.exports = app => {
  app.post("/api/drafts", async (req, res) => {
    const [err, draft] = await to(Draft.create(req.body.draft));
    if (err) {
      switch (err.name) {
        case "ValidationError":
          return res
            .status(422)
            .json(_.map(Object.values(err.errors), "message"));
        default:
          return res.status(500).json(["Something went wrong"]);
      }
    }

    const userId = req.user.id;
    const projectId = draft.projectId;
    const draftId = draft.id;
    const user = await User.findById(userId);
    const activeDrafts = user.projectsActiveDraft;
    const existingProject = activeDrafts.findIndex(el =>
      el.projectId.toString() === projectId);
    if (existingProject > -1) {
      user.projectsActiveDraft[existingProject].draftId = ObjectId(draftId);
    } else {
      user.projectsActiveDraft.push({projectId: projectId, draftId: draftId});
    }
    user.save();

    res.json(draft);
  });

  app.get("/api/drafts/:draftId", async (req, res) => {
    const draftOp = Draft.findById(req.params.draftId);
    const savesOp = Save.find({ draftId: req.params.draftId });
    const draft = await draftOp;
    const saves = await savesOp;
    const users = await User.find({_id: { $in: _.map(saves, "userId") } });
    res.json({
       draft,
       saves: _.keyBy(saves, "_id"),
       users: _.keyBy(users, "_id")
      });
  });

  app.patch("/api/drafts/:draftId", async (req, res) => {
    const saves = await Save.find({ draftId: req.params.draftId});
    const users = await User.find({_id: { $in: _.map(saves, 'userId') } });

    const user = await User.findById(req.user.id);
    const draft = await Draft.findById(req.params.draftId);
    const draftId = draft.id;
    const projectId = draft.projectId;

    const activeDrafts = user.projectsActiveDraft;
    const existingProject = activeDrafts.findIndex(el =>
      el.projectId.toString() === projectId.toString());
    if (existingProject > -1) {
      user.projectsActiveDraft[existingProject].draftId = ObjectId(draftId);
    } else {
      user.projectsActiveDraft.push({projectId: projectId, draftId: draftId});
    }
    user.save();

    res.json({
      draft,
      saves: _.keyBy(saves, '_id'),
      users: _.keyBy(users, '_id')
    });
  });
};
