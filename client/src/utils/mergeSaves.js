import { zip, keyBy, uniq } from 'lodash';

import { diffSaves } from './diffSaves';
import ChunkedMerge from './ChunkedMerge';

const byParentLine = diff => {
  const result = [];
  diff.forEach(operation => {
    if (operation.type === 'delete' || operation.type === 'none') {
      result.push([operation]);
    } else {
      result[result.length - 1].push(operation);
    }
  });
  return result;
};

const mergeRevisions = (mainRev, mergeRev) => {
  const mainByParentLine = byParentLine(mainRev);
  const mergeByParentLine = byParentLine(mergeRev);

  const chunks = new ChunkedMerge();

  for (const [mainOps, mergeOps] of zip(mainByParentLine, mergeByParentLine)) {
    if (mergeOps.length === 1 && mergeOps[0].type === 'none') {
      chunks.addOps(mainOps);
    } else if (mainOps.length === 1 && mainOps[0].type === 'none') {
      chunks.addOps(mergeOps);
    } else if (
      zip(mergeOps, mainOps).every(
        ([a, b]) => a.type === b.type && a.data === b.data
      )
    ) {
      chunks.addOps(...mainOps);
    } else {
      chunks.addConflictingOps({
        mainOps,
        mergeOps
      });
    }
  }
  return chunks;
};

const mergeSaves = (mainSave, mergeSave, parentSave) => {
  const mainRevs = keyBy(diffSaves(parentSave, mainSave), 'title');
  const mergeRevs = keyBy(diffSaves(parentSave, mergeSave), 'title');

  const titles = uniq([...Object.keys(mainRevs), ...Object.keys(mergeRevs)]);

  return titles.map(title => {
    const mainRev = mainRevs[title];
    const mergeRev = mainRevs[title];
    if (!mergeRev) return mainRev;
    if (!mainRev) return mergeRev;
    return mergeRevisions(mainRev, mergeRev);
  });
};

export default mergeSaves;
