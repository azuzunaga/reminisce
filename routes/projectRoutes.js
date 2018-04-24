const mongoose = require("mongoose");
const Project = mongoose.model("projects");

module.exports = app => {
  app.get("/api/projects", async (req, res) => {
    const projects = await Project.find({ ownerId: req.user.id });
    res.send(projects);
  });

  app.post("/api/projects", async (req, res) => {
    const project = new Project(req.body.project);
    project.ownerId = req.user.id;
    res.send(await project.save());
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.send(project);
  });

  app.delete("/api/projects/id", async (req, res) => {
    const project = await Project.findById(req.params.id);
    await project.remove();
    res.send(project);
  });
};
