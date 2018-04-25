const mongoose = require("mongoose");
const _ = require("lodash");

const Revision = mongoose.model("projects");

module.exports = app => {
  app.get("/api/revisions/:id", async (req, res) => {
    const revision = await Revision.findById(req.params.id);
    res.json(revision);
  });
};
