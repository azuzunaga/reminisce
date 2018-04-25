import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/stylingList.css';

class ProjectsListItem extends React.Component {
  render() {

    const { project } = this.props;

    return (
      <li>
        <div className='project-name'>
          <p> {project.name} </p>
        </div>
        <div className='project-details'>
          <p>{project.owner}</p>
          <p>{project.createdAt.split("T")[0]}</p>
          <p>{project.modifiedBy}</p>
        </div>
      </li>
    )
  }
}



function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(ProjectsListItem);
