import React from 'react';
import { createSave, closeModal } from '../actions';
import { connect } from 'react-redux';
import '../styles/newForm.css';
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

  handleSubmit() {
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
    this.props.createSave(save);
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
            onChange={this.update('name')}
          />

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
    draftId: ownProps.draftId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    createSave: (save) => dispatch(createSave(save))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveRev);
