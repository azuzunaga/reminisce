const mongoose = require("mongoose");
const Project = mongoose.model("projects");
const Draft = mongoose.model("drafts");

module.exports = app => {
  app.post("/api/drafts" async (req, res) => {
    const draft = await Draft.new(req.body.draft);
    res.send(draft);
  });
};
