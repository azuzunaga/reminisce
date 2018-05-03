import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createDraft, fetchDraft } from '../actions';

import '../styles/draftForm.css';
import '../styles/stylingList.css';

class DraftForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let draft = {
      name: this.state.name,
      projectId: this.props.projectId,
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

  toggleDraftMenu() {
    const draftMenu = document.getElementsByClassName('draft-menu')[0];
    const icon = document.getElementById('draft-expand');

    icon.innerHTML = icon.innerHTML === 'expand_more'
      ? 'expand_less'
      : 'expand_more';

    draftMenu.classList.toggle('hidden');
  }

  drafts(draftsArray) {
    return (
      <ul className="draft-list">
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
            Current Draft:
          </h4>
          <div
            className="draft-drop-down-button"
            onClick={this.toggleDraftMenu}
          >
            <h4>
              {this.props.activeDraft.name}
            </h4>
            <i className="material-icons" id='draft-expand'>expand_more</i>
          </div>
        </div>
        <div className="draft-menu hidden">
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
        <Link to={`/projects/${this.props.projectId}/drafts`} className='link-to-combine-drafts' >
          <h5 id='combine-drafts-link' className='combine-drafts-link'> Combine Drafts </h5>
        </Link>
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
