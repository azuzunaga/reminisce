import React from 'react';

import '../styles/diff.css';

const DiffDetails = ({ diffInfo }) => (
  <div>
    <ol>
      {diffInfo.map(op => (
        <li className={op.type} key={`${op.origIdx}:${op.targetIdx}`}>
          <div>op.origIdx</div>
          <div>op.targetIdx</div>
          <div>{op.data}</div>
        </li>
      ))}
    </ol>
  </div>
);

export default DiffDetails;
