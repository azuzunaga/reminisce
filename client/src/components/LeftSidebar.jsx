import React from 'react';

import DraftForm from './DraftForm';
import ProjectFileTree from './ProjectFileTree';

class LeftSidebar extends React.Component {
  render() {
    if (this.props.view === 'DocumentForm') {
      return (
        <ProjectFileTree
          projectId={this.props.projectId}
          revisions={this.props.revisions}
          view={this.props.view}
          projectName={this.props.projectName}
          documentId={this.props.documentId}
        />
      );
    } else {
      return (
        <div>
          <ProjectFileTree
            projectId={this.props.projectId}
            revisions={this.props.revisions}
            view={this.props.view}
            projectName={this.props.projectName}
            documentId={this.props.documentId}
          />
          <DraftForm
            activeDraft={this.props.activeDraft}
            projectId={this.props.projectId}
            drafts={this.props.drafts}
          />
        </div>
      );
    }
  }
}

export default LeftSidebar;
