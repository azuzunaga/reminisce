const mongoose = require('mongoose');
const _ = require('lodash');

const Revision = mongoose.model('revisions');
const Project = mongoose.model('projects');
const Draft = mongoose.model('drafts');

module.exports = app => {
  app.get('/api/projects/:projectId/revisions/:id', async (req, res) => {
    const revision = await Revision.findById(req.params.id);
    const project = await Project.findById(req.params.projectId);
    const projectDraft = _.find(
      req.user.projectsActiveDraft,
      el => el.projectId.toString() === project.id.toString()
    );
    const draft = await Draft.findById(projectDraft.draftId);
    res.json({ revision, project, draft });
  });
};
