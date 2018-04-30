import React from 'react';
import { Link } from 'react-router-dom';

import DraftForm from './DraftForm';
import ProjectFileTree from './ProjectFileTree';

class LeftSidebar extends React.Component {
  render() {
    if (this.props.view === 'DocumentForm') {
      return (
        <div>
          <header>
            <Link to="/dashboard" className={'to-dashboard-' + this.props.view}>
              <h5>To Projects Dashboard</h5>
              <i className="material-icons">chevron_left</i>
            </Link>
          </header>
          <ProjectFileTree
            projectId={this.props.projectId}
            revisions={this.props.revisions}
            view={this.props.view}
            projectName={this.props.projectName}
            documentId={this.props.documentId}
          />
        </div>
      );
    } else if (this.props.view === 'ProjectShow') {
      return (
        <div>
          <header>
            <Link to="/dashboard" className={'to-dashboard-' + this.props.view}>
              <h5>To Projects Dashboard</h5>
              <i className="material-icons">chevron_left</i>
            </Link>
          </header>
          <DraftForm
            activeDraft={this.props.activeDraft}
            projectId={this.props.projectId}
            drafts={this.props.drafts}
          />
          <Link to={`/projects/${this.props.projectId}/drafts`} >
            Combine Drafts
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <header>
            <Link to="/dashboard" className={'to-dashboard-' + this.props.view}>
              <h5>To Projects Dashboard</h5>
              <i className="material-icons">chevron_left</i>
            </Link>
          </header>
          <div className="folder-header">
            <Link to={`/projects/${this.props.projectId}`}>
              <i className="material-icons">chevron_right</i>
              <h4>{this.props.projectName}</h4>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default LeftSidebar;
