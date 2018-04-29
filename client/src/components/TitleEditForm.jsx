import { connect } from 'react-redux';
import { createSave, closeModal, receiveErrors } from '../actions';
import '../styles/newForm.css';
import React from 'react';

class TitleEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.document.title
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit (e) {
    e.preventDefault();
    const save = Object.assign({}, {
      save: { name: 'Title Change',
        draftId: this.props.draftId, isAuto: false },
        newRevs: [{title: this.state.title, body: this.props.document.body}],
        deletedRevIds: [this.props.document._id]
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
          <h3 className="new-form title">{"Change Title"}</h3>
          <input id="required-input"
            className="new-form name"
            type="text"
            onChange={this.update('title')}
            value={this.state.title}
          />
          {this.renderErrors()}
          <input
            className={"new-form submit Document"}
            type="submit"
            value={"Change Title"}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeDraftArr = state.auth.projectsActiveDraft;
  let idx = activeDraftArr.findIndex(el =>
    { return el.projectId === ownProps.projectId });
  let draftId = activeDraftArr[idx].draftId;
  return {
      document: ownProps.document,
      draftId,
      projectId: ownProps.projectId,
      errors: state.errors
  };
};

const mapDispatchToProps = (dispatch) => ({
  createSave: (save) => dispatch(createSave(save)),
  closeModal: () => dispatch(closeModal()),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default connect(mapStateToProps, mapDispatchToProps)(TitleEditForm);
