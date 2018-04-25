import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/stylingList.css';

class ProjectsListItem extends React.Component {
  render() {

    const { project, users } = this.props;
    return (
      <li>
        <div className='project-name'>
          <Link to={`/projects/${project._id}`}>
            <p> {project.name} </p>
          </Link>
        </div>
        <div className='project-details'>
          <p>{users[project.ownerId].firstName}</p>
          <p>{project.updatedAt.split("T")[0]}</p>
          <p>{project.modifiedBy}</p>
        </div>
      </li>
    )
  }
}



function mapStateToProps(state) {
  return { auth: state.auth, users: state.users };
}

export default connect(mapStateToProps)(ProjectsListItem);
