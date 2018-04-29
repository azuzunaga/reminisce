import React from 'react';

import DraftForm from './DraftForm';
import ProjectFileTree from './ProjectFileTree';

class LeftSidebar extends React.Component {
  render() {
    return (
      <div>
        <DraftForm
          activeDraft={this.props.activeDraft}
          project={this.props.project}
          drafts={this.props.drafts}
        />
        <ProjectFileTree
          view={this.props.view}
          revisions={this.props.revisions}
        />
      </div>
    );
  }
}

export default LeftSidebar;
