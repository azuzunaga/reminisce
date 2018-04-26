import { connect } from 'react-redux';
import { createSave, closeModal, receiveErrors } from '../actions';
import NewForm from './NewForm';

const mapStateToProps = (state) => {
  return {
    userId: state.auth._id,
    formType: "Document",
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(receiveErrors([])),
    processForm: (revision) => dispatch(createSave({
      name: "abc",
      draftId: "5adf71cff326761db0a05d98",
      newRevs: [],
      deletedRevIds: []
    }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
