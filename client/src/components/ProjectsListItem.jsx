import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/stylingList.css';
import { dateTimeFormatter } from '../utils/dateFormatter';

class ProjectsListItem extends React.Component {
  render() {

    const { project, users } = this.props;
    if (Object.keys(users).length === 0) {
      return <div>Loading...</div>
    }
    return (
      <li className='list-item project'>
        <div className='list-name'>
          <Link to={`/projects/${project._id}`}>
            <p> {project.name} </p>
          </Link>
        </div>
        <Link to={`/users/${project.ownerId}`}>
          <p>{users[project.ownerId].firstName}</p>
        </Link>
        <p>{dateTimeFormatter(project.updatedAt)}</p>
      </li>
    )
  }
}



function mapStateToProps(state) {
  return { auth: state.auth, users: state.users };
}

export default connect(mapStateToProps)(ProjectsListItem);
