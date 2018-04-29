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
            project={this.props.project}
            drafts={this.props.drafts}
          />
        </div>
      );
    } else {
      return (
        <ProjectFileTree
          project={this.props.project}
          revisions={this.props.revisions}
        />
      );
    }
  }
}

export default LeftSidebar;
