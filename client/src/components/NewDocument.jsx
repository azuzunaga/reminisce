import { connect } from 'react-redux';
import { newRevision, closeModal, receiveErrors } from '../actions';
import NewForm from './NewForm';

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth._id,
    formType: "Document",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: revision => dispatch(newRevision(revision)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(receiveErrors([]))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
