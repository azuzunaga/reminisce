import React from 'react';
import { sumBy } from 'lodash';

import '../../styles/diff.css';

const RevisionDiff = ({ rev }) => {
  // const added = sumBy(rev.diffInfo, op => op.type === 'insert');
  // const addEl = added ? <span className="add">+{added}</span> : "";
  // const deleted = sumBy(rev.diffInfo, op => op.type === 'delete');
  // const deletedEl = deleted ? <span className="delete">-{deleted}</span> : "";
  // const comma = added && deleted ? ", " : "";

  return (
    <div className="revision-diff">
      <ol>
        {rev.diffInfo.map(op => (
          <li className={op.type} key={`${op.origIdx}:${op.targetIdx}`}>
            <div className="line-num">{op.origIdx}</div>
            <div className="line-num">{op.targetIdx}</div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: op.data }}
            />
          </li>
        ))}
      </ol>
      <div className="minimap">
        <ol>
          {rev.diffInfo.map(op => (
            <li
              key={`${op.origIdx}:${op.targetIdx}`}
              dangerouslySetInnerHTML={{ __html: op.data }}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RevisionDiff;
