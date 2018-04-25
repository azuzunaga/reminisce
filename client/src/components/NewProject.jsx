import { connect } from 'react-redux';
import React from 'react';
import { newProject } from '../actions';
import NewForm from './NewForm';

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.id,
    formType: "Project",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    procesForm: project => dispatch(newProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
