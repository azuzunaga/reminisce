const mongoose = require("mongoose");
const Draft = mongoose.model("drafts");

module.exports = app => {
  app.post("/api/drafts", async (req, res) => {
    const draft = await Draft.new(req.body.draft);
    res.send(draft);
  });
};
