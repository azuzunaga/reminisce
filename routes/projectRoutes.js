const mongoose = require("mongoose");
const _ = require("lodash");

const { to } = require("../utils/utils");
const Project = mongoose.model("projects");
const Draft = mongoose.model("drafts");

module.exports = app => {
  app.get("/api/projects", async (req, res) => {
    const projects = await Project.find({ ownerId: req.user.id });
    res.json(_.keyBy(projects, "_id"));
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
            .json("You already have a project with that name");
        default:
          return res.status(500).json(["Something went wrong"]);
      }
    }
    const draft = new Draft({ name: "main", projectId: project.id });
    await draft.save();
    res.json({ project, draft });
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id);
    const drafts = await Draft.find({ projectId: req.params.id });
    res.json({ project, drafts: _.keyBy(drafts, "_id") });
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id);
    await project.remove();
    res.json(project);
  });
};
