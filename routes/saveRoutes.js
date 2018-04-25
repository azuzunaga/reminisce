const _ = require("lodash");
const mongoose = require("mongoose");

const Project = mongoose.model("projects");
const Draft = mongoose.model("drafts");
const Revision = mongoose.model("revisions");
const Save = mongoose.model("saves");

module.exports = app => {
  app.post("/api/saves", async (req, res) => {
    const saveParams = req.body.save;
    const { newRevs, deletedRevIds } = req.body;

    let prevSave = { revisionIds: [] };
    if (saveParams.previousSaveId) {
      prevSave = Save.findById(saveParams.previousSaveId);
    }

    const draft = await Draft.findById(saveParams.draftId);
    const project = await Project.findById(draft.projectId);
    if (!project.canUserEdit(req.user.id)) {
      return res
        .status(403)
        .json(["You don't have permission to edit that project"]);
    }

    await prevSave;

    let prevRevIds = prevSave.revisionIds;
    prevRevIds = prevRevIds.filter(id => !deletedRevIds.includes(id));

    newRevs.forEach(rev => (rev.userId = req.user.id));
    Revision.create(newRevs, async (err, revs) => {
      newRevIds = prevRevIds.concat(_.map(revs, "id"));
      const save = new Save(saveParams);
      save.userId = req.user.id;
      save.projectId = project.id;
      save.revisionIds = newRevIds;

      res.json(await save.save());
    });
  });

  app.get("/api/saves/:id", async (req, res) => {
    const save = await Save.findById(req.params.id);
    res.json(save);
  });
};
