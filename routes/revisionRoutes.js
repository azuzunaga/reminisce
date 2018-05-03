const mongoose = require('mongoose');
const _ = require('lodash');

const Revision = mongoose.model('revisions');
const Project = mongoose.model('projects');
const Draft = mongoose.model('drafts');
const Save = mongoose.model('saves');

module.exports = app => {
  app.get('/api/projects/:projectId/revisions/:title', async (req, res) => {
    const project = await Project.findById(req.params.projectId);
    const projectDraft = _.find(
      req.user.projectsActiveDraft,
      el => el.projectId.toString() === project.id.toString()
    );
    const draft = await Draft.findById(projectDraft.draftId);
    const saveId = draft.saveIds[draft.saveIds.length - 1];
    const lastSave = await Save.findById(saveId);
    const revisions = await Revision.find({ _id: { $in: lastSave.revisionIds } }) || [];

    console.log(revisions);
    const revision = _.find(
      revisions,
      rev => rev.title == req.params.title
    )

    if (!revision) {
      return res.status(404).json(["That document does not exist"]);
    }

    res.json({ revision, project, draft });
  });


};
