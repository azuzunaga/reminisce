import React from 'react';

import DraftForm from './DraftForm';
import ProjectFileTree from './ProjectFileTree';

class LeftSidebar extends React.Component {
  render() {
    if (this.props.view === 'ProjectShow') {
      return (
        <div>
          <DraftForm
            activeDraft={this.props.activeDraft}
            projectId={this.props.projectId}
            drafts={this.props.drafts}
          />
        </div>
      );
    } else {
      return (
        <ProjectFileTree
          projectId={this.props.projectId}
          revisions={this.props.revisions}
        />
      );
    }
  }
}

export default LeftSidebar;
