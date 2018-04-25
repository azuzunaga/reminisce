import React from 'react';

import diff from '../utils/diff';

class Diff extends React.Component {
  componentDidMount() {
    // Fetch commit and prev commit
  }

  render() {
    const { newSave } = this.props;
    return (
      <div className="diff-view">
        <h2>Save:</h2>
      </div>
    );
  }
}

export default Diff;
