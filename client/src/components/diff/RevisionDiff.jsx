import React from 'react';

import '../../styles/diff.css';

const RevisionDiff = ({ rev }) => {
  return (
    <div className="revision-diff">
      <h4>{rev.title}</h4>
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
    </div>
  );
};

export default RevisionDiff;
