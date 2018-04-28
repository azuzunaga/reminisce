import { connect } from 'react-redux';
import { createSave, closeModal, receiveErrors } from '../actions';
import NewForm from './NewForm';

const mapStateToProps = (state, ownProps) => {
  const draftId = state.auth.projectsActiveDraft.find(
    el => el.projectId === ownProps.projectId
  ).draftId;

  return {
    userId: state.auth._id,
    formType: "Document",
    errors: state.errors,
    draftId
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
