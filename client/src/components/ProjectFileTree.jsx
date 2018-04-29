import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/projectFileTree.css';

class ProjectFileTree extends React.Component {

  menu() {
    if (this.props.view === 'DocumentForm') {
      return (
        <ul className="project-file-tree-list">
          {this.props.revisions.map(doc => {
            return (
              <li>
                <Link
                  to={`/project/${this.props.project._id}/document/${doc._id}`}
                >
                  <i class="material-icons">chevron_right</i>
                  <h6>{doc.title}</h6>
                </Link>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  }


  render() {
    return (
      <div className="project-file-tree">
        <header>
          <Link to="/dashboard">
            <h5>To Projects Dashboard</h5>
            <i className="material-icons">chevron_left</i>
          </Link>
        </header>
        <div>
          {this.menu()}
        </div>
      </div>
    );
  }
}

export default ProjectFileTree;
