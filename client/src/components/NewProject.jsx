import { connect } from 'react-redux';
import { newProject, closeModal } from '../actions';
import NewForm from './NewForm';

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth._id,
    formType: "Project",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: project => dispatch(newProject(project)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
