import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import { fetchDraft } from '../actions/index';
import { updateConflictSelection } from '../actions/index';
import CombineDraftsModal from './CombineDraftsModal';

class ResolveConflictsModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.conflict;
    this.handleSelection = this.handleSelection.bind(this);
  }
  componentDidMount() {
  }

  handleSelection(draftVersion) {
    const that = this;

    return e => {
      e.preventDefault();
      const conflictId = that.state.id
      that.setState({ selectedDraft: draftVersion }, () => {
        this.props.updateConflictSelection({[conflictId]: that.state});
        this.props.combineDraftsModal();
      })
      //
      // this.props.combineDraftsModal();
    }
  }

  render() {

    const { drafts } = this.props;
    const { body } = this.props.conflict;
    const { draft1, draft2, winningDraft, losingDraft } = this.props.selectedDrafts;
    const mainDraft =  drafts[winningDraft].name;
    const mergeDraft = drafts[losingDraft].name;

      return (
        <div className='resolve-conflicts-modal'>
          <header className='conflicts-header'>
            <h3>Resolve Conflict: {body.document} </h3> <span onClick={() => this.props.combineDraftsModal()} className="close-x">x</span>
          </header>
          <div className="resolve-comparison-section">
            <section className="conflict-draft-section">
              <h4> Draft: {mainDraft}</h4>
              <div className='conflict-text'>
                <p> <div dangerouslySetInnerHTML={{__html: body.contextBefore}} /> </p>
                <p className='conflict-paragraph-mainDraft'> <div dangerouslySetInnerHTML={{__html: body.mainDraft}} /></p>
                <p> <div dangerouslySetInnerHTML={{__html: body.contextAfter}} /> </p>
              </div>
              <button onClick={this.handleSelection(winningDraft)} className='draft1-button'>Use Me </button>
            </section>
            <section className="conflict-draft-section">
              <h4> Draft: {mergeDraft} </h4>
              <div className='conflict-text'>
                <p> <div dangerouslySetInnerHTML={{__html: body.contextBefore}} /> </p>
                <p className='conflict-paragraph-mergeDraft'> <div dangerouslySetInnerHTML={{__html: body.mergeDraft}} />  </p>
                <p> <div dangerouslySetInnerHTML={{__html: body.contextAfter}} /> </p>
              </div>
                <button onClick={this.handleSelection(losingDraft)}  className='draft2-button'>Use Me</button>
            </section>
          </div>
        </div>

      )
  }
}


const mapStateToProps = state => {
  return {
    modal: state.ui.modal,
    selectedDrafts: state.ui.selectedDrafts,
    drafts: state.drafts,
    saves: Object.values(state.saves),
    users: state.users

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchDraft: id => dispatch(fetchDraft(id)),
    combineDraftsModal: () => dispatch(openModal(<CombineDraftsModal projectId={ownProps.projectId} />)),
    updateConflictSelection: conflict => dispatch(updateConflictSelection(conflict)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResolveConflictsModal);
