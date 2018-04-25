import { connect } from 'react-redux';
import { newRevision, closeModal } from '../actions';
import NewForm from './NewForm';

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth._id,
    formType: "Project",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: revision => dispatch(newRevision(revision)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
