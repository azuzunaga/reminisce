import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/projectFileTree.css';

class ProjectFileTree extends React.Component {
  menu() {
    if (this.props.view === 'DocumentForm') {
      return (
        <div>
          hello
        </div>
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
            <i class="material-icons">chevron_left</i>
          </Link>
        </header>
        <main>
          {this.menu()}
        </main>
      </div>
    );
  }
}

export default ProjectFileTree;
