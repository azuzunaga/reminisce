const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const _ = require("lodash");

const { to } = require("../utils/utils");
const Project = mongoose.model("projects");
const Draft = mongoose.model("drafts");
const Revision = mongoose.model("revisions");
const User = mongoose.model("users");
const Save = mongoose.model("saves");

module.exports = app => {
  app.get("/api/projects", async (req, res) => {
    const projects = await Project.find({ ownerId: req.user.id });
    const users = await User.find({ _id: { $in: _.map(projects, "ownerId") } });
    res.json({
      projects: _.keyBy(projects, "_id"),
      users: _.keyBy(users, "_id")
    });
  });

  app.post("/api/projects", async (req, res) => {
    const project = new Project(req.body.project);
    project.ownerId = req.user.id;
    const [err] = await to(project.save());
    if (err) {
      switch (err.name) {
      case "ValidationError":
        return res
          .status(422)
          .json(_.map(Object.values(err.errors), "message"));
      case "BulkWriteError":
        return res
          .status(422)
          .json(["You already have a project with that name"]);
      default:
        return res.status(500).json(["Something went wrong"]);
      }
    }

    const save = new Save({
      name: "Project created",
      projectId: project.id,
      userId: req.user.id
    });
    save.save();

    const draft = new Draft({
      name: "main",
      projectId: project.id,
      saveIds: [save.id]
    });
    draft.save();

    const user = req.user;
    const activeDrafts = user.projectsActiveDraft;
    const existingProject = activeDrafts.findIndex(el =>
      el.projectId.toString() === project.id);
    if (existingProject > -1) {
      user.projectsActiveDraft[existingProject].draftId = ObjectId(draft.id);
    } else {
      user.projectsActiveDraft.push({projectId: project.id, draftId: draft.id});
    }
    user.save();

    res.json({
      project,
      draft,
      users: _.keyBy([user], '_id')
    });
  });

  app.get("/api/projects/:id", async (req, res) => {
    let project = await Project.findById(req.params.id);
    const drafts = await Draft.find({ projectId: req.params.id });
    const activeDraftId = _.find(req.user.projectsActiveDraft, el => (
      el.projectId.toString() === req.params.id
    )).draftId;
    const activeDraft = _.find(drafts, d => d._id.toString() === activeDraftId.toString());
    const saves = await Save.find({ _id: { $in: activeDraft.saveIds } });
    const users = await User.find({ _id: { $in: _.map(saves, "userId") } });

    const lastSaveId = activeDraft.saveIds[activeDraft.saveIds.length - 1];
    const lastSave = _.find(saves, save => save._id.toString() === lastSaveId.toString());

    const revisions = lastSave ? await Revision.find({ _id: {$in: lastSave.revisionIds}}) : [];
    project = project.toObject()
    project.draftIds = _.map(drafts, "_id");
    res.json({
      project,
      drafts: _.keyBy(drafts, "_id"),
      saves: _.keyBy(saves, "_id"),
      revisions: _.keyBy(revisions, "_id"),
      users: _.keyBy(users, "_id")
    });
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id);
    await project.remove();
    res.json({ project });
  });
};
