const _ = require('lodash');
const mongoose = require('mongoose');

const { to } = require('../utils/utils');
const Project = mongoose.model('projects');
const Draft = mongoose.model('drafts');
const Revision = mongoose.model('revisions');
const Save = mongoose.model('saves');

module.exports = app => {
  app.post('/api/saves', async (req, res) => {
    const saveParams = req.body.save;
    const { newRevs, deletedRevIds } = req.body;

    const draft = await Draft.findById(saveParams.draftId);
    const project = await Project.findById(draft.projectId);

    let prevSave = { revisionIds: [], id: null, isAuto: false };
    if (draft.saveIds.length) {
      prevSave = await Save.findById(draft.saveIds[draft.saveIds.length - 1]);
    }

    if (!project.canUserEdit(req.user.id)) {
      return res
        .status(403)
        .json(["You don't have permission to edit that project"]);
    }

    let prevRevIds = prevSave.revisionIds;
    prevRevIds = prevRevIds.filter(id => !deletedRevIds.includes(id));

    prevRevs = await Revision.find({ _id: { $in: prevRevIds } });
    const titles = _.map(prevRevs.concat(newRevs), 'title');
    if (titles.length !== _.uniq(titles).length) {
      return res
        .status(403)
        .json([
          "You can't have multiple documents with the same title in a draft"
        ]);
    }

    newRevs.forEach(rev => (rev.userId = req.user.id));
    Revision.create(newRevs, async (err, revs) => {
      if (err) {
        switch (err.name) {
        case "ValidationError":
          return res
            .status(422)
            .json(_.map(Object.values(err.errors), "message"));
        default:
          return res.status(500).json(["Something went wrong"]);
        }
      }
      newRevIds = prevRevIds.concat(_.map(revs, 'id'));
      const save = new Save(saveParams);
      save.userId = req.user.id;
      save.projectId = project.id;
      save.revisionIds = newRevIds;
      save.previousSaveId = prevSave.id;
      if (prevSave.isAuto) {
        save.previousManualSaveId = prevSave.previousManualSaveId;
      } else {
        save.previousManualSaveId = prevSave.id;
      }
      const [saveErr] = await to(save.save());
      if (saveErr) {
        switch (saveErr.name) {
        case "ValidationError":
          return res
            .status(422)
            .json(_.map(Object.values(saveErr.errors), "message"));
        default:
          return res.status(500).json(["Something went wrong"]);
        }
      }
      draft.saveIds.push(save.id);
      draft.updatedAt = Date.now();
      draft.save();
      project.updatedAt = Date.now();
      project.save();
      res.json({save, revisions: _.keyBy(revs, "_id")});
    });
  });

  app.get('/api/saves/:id', async (req, res) => {
    const save = await Save.findById(req.params.id);
    const prevManualSave = await Save.findById(save.previousManualSaveId);
    const revisions = await Revision.find({
      _id: { $in: save.revisionIds.concat(prevSave ? prevSave.revisionIds : []) }
    });
    res.json({
      saves: _.keyBy([save, prevSave], '_id'),
      revisions: _.keyBy(revisions, '_id')
    });
  });
};
