import React from 'react';
import { createSave, closeModal, receiveErrors } from '../actions';
import { connect } from 'react-redux';
import '../styles/newForm.css';
import { withRouter } from 'react-router-dom';
class SaveRev extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  checkIfErrors() {
    if (this.props.errors.length < 1) {
      this.props.closeModal();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const save = Object.assign({}, {
      save: { name: this.state.name,
        draftId: this.props.draftId,
        isAuto: false
      },
      newRevs: [{
        title: this.props.document.title,
        body: this.props.body
      }],
      deletedRevIds: [this.props.document._id]
    });
    this.props.clearErrors();
    this.props.createSave(save, this.props.draftId).then((payload) => {
      this.checkIfErrors();
      if (payload) {
        this.props.history
        .replace(`/project/${this.props.projectId}/document/${Object.keys(payload.revisions)[0]}`);
      }
    });
  }

  renderErrors() {
    if (this.props.errors.length > 0) {
      let errors = this.props.errors.map((error, i) => <li key={i}>{error}</li>);
      return (
        <ul className="error-message">{errors}</ul>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="new-form-container">
        <form onSubmit={this.handleSubmit.bind(this)} className="new-form">
          <h3 className="new-form-title">{"Save Message"}</h3>
          <input
            id="require-input"
            className="new-form name"
            type="text"
            placeholder="Enter a message so you can remember what you did"
            onChange={this.update('name')}
          />
          {this.renderErrors()}
          <input
            className={"new-form submit " + "save"}
            type="submit"
            value="Save Document"
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    body: ownProps.body,
    document: ownProps.document,
    draftId: ownProps.draftId,
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    createSave: (save) => dispatch(createSave(save)),
    clearErrors: () => dispatch(receiveErrors([]))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaveRev));
