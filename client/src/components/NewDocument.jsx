import { connect } from 'react-redux';
import { createSave, closeModal, receiveErrors } from '../actions';
import NewForm from './NewForm';

const mapStateToProps = (state) => {
  return {
    userId: state.auth._id,
    formType: "Document",
    errors: state.errors,
    drafts: state.drafts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(receiveErrors([])),
    processForm: (save) => dispatch(createSave(save))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
