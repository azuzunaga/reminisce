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
          <ProjectFileTree
            projectId={this.props.projectId}
            revisions={this.props.revisions}
            view={this.props.view}
            projectName={this.props.projectName}
            documentId={this.props.documentId}
          />
        </div>
      );
    } else {
      return (
        <ProjectFileTree
          projectId={this.props.projectId}
          revisions={this.props.revisions}
          view={this.props.view}
          projectName={this.props.projectName}
          documentId={this.props.documentId}
        />
      );
    }
  }
}

export default LeftSidebar;
