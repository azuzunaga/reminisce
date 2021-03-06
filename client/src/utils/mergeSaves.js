import { zip, keyBy, uniq } from 'lodash';

import diffSaves from './diffSaves';
import ChunkedMerge from './ChunkedMerge';

const byParentLine = diff => {
  const result = [];
  diff.forEach(operation => {
    if (
      operation.type === 'delete' ||
      operation.type === 'none' ||
      result.length === 0
    ) {
      result.push([operation]);
    } else {
      result[result.length - 1].push(operation);
    }
  });
  return result;
};

const mergeRevisions = (mainRev, mergeRev) => {
  const mainByParentLine = byParentLine(mainRev.diffInfo);
  const mergeByParentLine = byParentLine(mergeRev.diffInfo);

  const chunks = new ChunkedMerge(mainRev.title);

  for (const [mainOps, mergeOps] of zip(mainByParentLine, mergeByParentLine)) {
    if (mergeOps.length === 1 && mergeOps[0].type === 'none') {
      chunks.addOps(mainOps);
    } else if (mainOps.length === 1 && mainOps[0].type === 'none') {
      chunks.addOps(mergeOps);
    } else if (
      zip(mergeOps, mainOps).every(
        ([a, b]) => a && b && a.type === b.type && a.data === b.data
      )
    ) {
      chunks.addOps(mainOps);
    } else {
      chunks.addConflictOps({
        mainOps: mainOps.filter(op => op.type !== 'delete'),
        mergeOps: mergeOps.filter(op => op.type !== 'delete')
      });
    }
  }

  if (chunks.getConflicts().length === 0) {
    return chunks.resolveConflicts([]);
  }

  return chunks;
};

const mergeSaves = (mainSave, mergeSave, parentSave, revisions) => {
  const mainRevs = keyBy(diffSaves(parentSave, mainSave, revisions), 'title');
  const mergeRevs = keyBy(diffSaves(parentSave, mergeSave, revisions), 'title');

  const titles = uniq([...Object.keys(mainRevs), ...Object.keys(mergeRevs)]);

  return titles.map(title => {
    const mainRev = mainRevs[title];
    const mergeRev = mergeRevs[title];
    if (!mergeRev) return mainRev;
    if (!mainRev) return mergeRev;
    return mergeRevisions(mainRev, mergeRev);
  });
};

export default mergeSaves;
