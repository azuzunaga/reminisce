import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/projectFileTree.css';

class ProjectFileTree extends React.Component {
  menu() {
    let revisions = Object.values(this.props.revisions);

    if (revisions.length > 0 ){
      revisions.sort((a, b) => {
        let titleA = a.title.toUpperCase();
        let titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;}
      );
    }

    if (this.props.view === 'DocumentForm') {
      return (
        <div>
          <div className="folder-header">
            <Link to={`/projects/${this.props.projectId}`}>
              <i className="material-icons">chevron_left</i>
              <h4>{this.props.projectName}</h4>
            </Link>
          </div>
          <ul className="project-file-tree-list">
            {revisions.map(doc => {
              if (doc._id === this.props.documentId) {
                return (
                  <li className='current-doc' key={doc._id}>
                    <i className="material-icons">chevron_right</i>
                    <h6>{doc.title}</h6>
                  </li>
                );
              } else {
                return (
                  <li key={doc._id}>
                    <Link
                      to={`/project/${this.props.projectId}/document/${doc.title}`}
                    >
                      <i className="material-icons">chevron_right</i>
                      <h6>{doc.title}</h6>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }


  render() {
    return (
      <div className="project-file-tree">
        {this.menu()}
      </div>
    );
  }
}



export default ProjectFileTree;
