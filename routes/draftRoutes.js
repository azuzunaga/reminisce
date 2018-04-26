const mongoose = require("mongoose");
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
    res.json(draft);
  });

  app.get("/api/drafts/:draftId", async (req, res) => {
    const draftOp = Draft.findById(req.params.draftId);
    const savesOp = Save.find({ draftId: req.params.draftId });
    draft = await draftOp;
    saves = await savesOp;
    const users = await User.find({_id: { $in: _.map(saves, "userId") } });
    res.json({
       draft,
       saves: _.keyBy(saves, "_id"),
       users: _.keyBy(users, "_id")
      });
  });
};
