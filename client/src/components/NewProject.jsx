import { connect } from 'react-redux';
import { newProject, closeModal, receiveErrors } from '../actions';
import NewForm from './NewForm';

const mapStateToProps = (state) => {
  return {
    userId: state.auth._id,
    formType: "Project",
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: project => dispatch(newProject(project)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(receiveErrors([]))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
