import React from 'react';
import { connect } from 'react-redux';

import { createDraft, fetchDraft } from '../actions';

import '../styles/draftForm.css';
import '../styles/stylingList.css';

class DraftForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      projectId: this.props.project._id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let draft = {
      name: this.state.name,
      projectId: this.props.project._id,
      saveIds: this.props.activeDraft.saveIds
    };

    this.props.createDraft(draft);
    this.setState({name: ''});
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleClick(e) {
    let draftId = e.target.id;
    this.props.fetchDraft(draftId);
  }

  drafts(draftsArray) {
    return (
      <ul>
        {draftsArray.map(draft => {
          return (
            <li key={draft._id}
              onClick={this.handleClick}
              id={draft._id}
              className="list-item draft"
            >
              {draft.name}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const draftsArray = Object.values(this.props.drafts);

    return (
      <div className="draft-form-container">
        <div className='draft-drop-down-header'>
          <h4 className="draft-version">
            Draft Version:
          </h4>
          <div className="draft-drop-down-button">
            <h4>
              {this.props.activeDraft.name}
            </h4>
            <i className="material-icons">arrow_drop_down</i>
          </div>
        </div>
        {this.drafts(draftsArray)}
        <div className="draft-form">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="New Draft"
              onChange={this.update('name')}
              className="draft-form text"
              value={this.state.name}
            />
            <input
              className="draft-form submit "
              type="submit"
              value="Create Draft"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps= ({ auth }) => (

  {
    auth
  }
);

const  mapDispatchToProps = dispatch => (
  {
    createDraft: draft => dispatch(createDraft(draft)),
    fetchDraft: draftId => dispatch(fetchDraft(draftId))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DraftForm);
