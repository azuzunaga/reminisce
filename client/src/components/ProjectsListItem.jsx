import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/stylingList.css';
import { dateTimeFormatter } from '../utils/dateFormatter';
import ConfirmDeleteForm from "./ConfirmDeleteForm";
import { deleteProject, openModal } from "../actions";

class ProjectsListItem extends React.Component {
  render() {

    const { project, users } = this.props;
    if (Object.keys(users).length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <li className='list-item project'>
        <div className='list-name'>
          <Link to={`/projects/${project._id}`}>
            <p className='project-name'> {project.name} </p>
          </Link>
          <button
            className='delete-button'
            onClick={
              () => this.props.openModal(
                <ConfirmDeleteForm
                  action={this.props.deleteProject}
                  message="Are you sure you want to delete this project?"/>
              )
            }
            >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>

        </div>

          <p>{users[project.ownerId].firstName}</p>

        <p>{dateTimeFormatter(project.updatedAt)}</p>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, users: state.users };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteProject: () => dispatch(deleteProject(ownProps.project._id)),
    openModal: (component) => dispatch(openModal(component))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListItem);
