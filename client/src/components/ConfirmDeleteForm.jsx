import { connect } from 'react-redux';
import { createSave, closeModal, receiveErrors } from '../actions';
import '../styles/newForm.css';
import React from 'react';

class ConfirmDeleteForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    const save = Object.assign({}, {
      save: { name: `Delete Document: ${this.props.revision.title}`,
        draftId: this.props.draftId, isAuto: false },
        newRevs: [],
        deletedRevIds: [this.props.revision._id]
    });
    this.props.clearErrors();
    this.props.createSave(save).then(this.checkErrors.bind(this));
  }

  renderErrors() {
    if (this.props.errors.length > 0) {
      let errors = this.props.errors.map((error, i) =>
        <li key={i}>{error}</li>
      );
      return (<ul className="error-message">{errors}</ul>);
    }
  }

  checkErrors() {
    if (this.props.errors.length < 1) {
      this.props.closeModal();
    }
  }

  render () {
    return (
      <div className="new-form-container">
        <form onSubmit={this.handleSubmit} className="new-form">
          <h3 className="new-form title">Are you sure you want to delete this document?</h3>
          {this.renderErrors()}
          <div class="buttons-holder">
            <button className="cancel-button" onClick={this.props.closeModal}>Cancel</button>
            <input
              className="new-form submit Document"
              type="submit"
              value="Delete"
              />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeDraftArr = state.auth.projectsActiveDraft;
  let idx = activeDraftArr.findIndex(
    el => el.projectId === ownProps.projectId
  );
  let draftId = activeDraftArr[idx].draftId;
  return {
      draftId,
      errors: state.errors,
      revision: state.revisions[ownProps.revisionId]
  };
};

const mapDispatchToProps = (dispatch) => ({
  createSave: (save) => dispatch(createSave(save)),
  closeModal: () => dispatch(closeModal()),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteForm);
