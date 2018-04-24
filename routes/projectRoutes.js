const mongoose = require("mongoose");
const _ = require("lodash");

const Project = mongoose.model("projects");
const Draft = mongoose.model("drafts");

module.exports = app => {
  app.get("/api/projects", async (req, res) => {
    const projects = await Project.find({ ownerId: req.user.id });
    res.send(projects);
  });

  app.post("/api/projects", async (req, res) => {
    const project = new Project(req.body.project);
    project.ownerId = req.user.id;
    await project.save();
    const draft = new Draft({ name: "main", projectId: project.id });
    await draft.save();
    res.send({ project, draft });
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id);
    const drafts = await Draft.find({ projectId: req.params.id });
    res.send({ project, drafts: _.keyBy(drafts, "_id") });
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id);
    await project.remove();
    res.send(project);
  });
};
