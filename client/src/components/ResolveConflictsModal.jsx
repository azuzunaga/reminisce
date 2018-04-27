import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import { fetchDraft } from '../actions/index';
import CombineDraftsModal from './CombineDraftsModal';

const drafts = {
  draft1: {
    name: 'Fact Checked'
  },
  draft2: {
    name: 'Not Fact Checked'
  }
}

class ResolveConflictsModal extends React.Component {
  componentDidMount() {
  }

  render() {

    const { conflict } = this.props;
      return (
        <div className='resolve-conflicts-modal'>
          <header className='conflicts-header'>
            <h3>Resolve Conflict: {conflict.document} </h3> <span onClick={() => this.props.combineDraftsModal()} className="close-x">x</span>
          </header>
          <div className="resolve-comparison-section">
            <section className="conflict-draft-section">
              <h4> Draft: {drafts.draft1.name}</h4>
              <div className='conflict-text'>
                <p> {conflict.contextBefore} </p>
                <p className='draft1 conflict-paragraph'> <mark className='draft1-highlight'> {conflict.draft1} </mark> </p>
                <p> {conflict.contextAfter} </p>
              </div>
              <button className='draft1-button'>Use Me </button>
            </section>
            <section className="conflict-draft-section">
              <h4> Draft: {drafts.draft2.name} </h4>
              <div className='conflict-text'>
                <p> {conflict.contextBefore} </p>
                <p className='draft2 conflict-paragraph'> <mark className='draft2-highlight'> {conflict.draft2} </mark>  </p>
                <p> {conflict.contextAfter} </p>
              </div>
                <button className='draft2-button'>Use Me</button>
            </section>
          </div>
        </div>

      )
  }
}


const mapStateToProps = state => {
  return {
    modal: state.ui.modal,
    draft: Object.values(state.drafts)[0],
    saves: Object.values(state.saves),
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchDraft: id => dispatch(fetchDraft(id)),
    combineDraftsModal: () => dispatch(openModal(<CombineDraftsModal />)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResolveConflictsModal);
