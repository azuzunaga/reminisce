import React from 'react';
import { connect } from 'react-redux';

import { createDraft } from '../actions';

import '../styles/draftForm.css';

class DraftForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      projectId: this.props.project._id,
      saveIds: this.props.activeDraft.saveIds
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createDraft(this.state);
    
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  drafts(draftsArray) {
    return (
      <ul>
        {draftsArray.map(draft => {
          return (
            <li key={draft._id}>
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
        HAI IM DRAFTFORM
        {this.drafts(draftsArray)}
        <div className="draft-form">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="New Draft"
              onChange={this.update('name')}
              className="draft-form text"
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
    createDraft: draft => dispatch(createDraft(draft))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DraftForm);
