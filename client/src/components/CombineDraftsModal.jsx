import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import { fetchDraft, updateConflictSelection } from '../actions/index';
import ResolveConflictsModal from './ResolveConflictsModal';
import '../styles/draftConflicts.css';

class CombineDraftsModal extends React.Component {

  constructor(props) {
    super(props);
    this.checkAllSelected = this.checkAllSelected.bind(this);
    this.handleCombine = this.handleCombine.bind(this);
  }

  componentDidMount() {
    const combineButton = document.getElementById('combine-drafts-modal-button');
    combineButton.disabled = true;
    this.checkAllSelected();
    // 1. Using the selected drafts --> perform conflict algorithm.
    // 2. Push selected drafts into UI conflcits reducer
    // 3. Display results from UI conflicts reducer
  }

  handleChooseDraft(e) {
    const { conflicts, drafts } = this.props;
    const conflictIds = Object.keys(conflicts);
    const winningDraft = document.getElementById('choose-draft1-option').selected ?
      drafts.draft1 : drafts.draft2;


    conflictIds.forEach( id => {
      conflicts[id].selectedDraft = winningDraft;
      this.props.updateConflictSelection({[id]: conflicts[id]});
    })

  }

  handleCombine() {
    return e => {
      e.preventDefault();
      console.log('combineeeee baby')
    }
  }

  checkAllSelected() {
    const checkboxes = Array.from(document.getElementsByClassName('conflicts-checkbox-filter'));

    if (checkboxes.length > 0) {
      const checked = checkboxes.filter(checkbox => checkbox.checked === true).length;
      const combineButton = document.getElementById('combine-drafts-modal-button');
      if (checked === checkboxes.length) {
        combineButton.classList.add('all-resolved');
        combineButton.disabled = false;
      } else {
        combineButton.classList.remove('all-resolved');
        combineButton.disabled = true;
      }

    }

  }

  renderListItem(conflict) {
    const { drafts } = this.props;
    return (
      <li className='draft-conflicts-list-item'
      key={`conflict-${conflict.name}-${conflict.id}`}>
        <div className='draft-conflicts-resolve'
          onClick={() => this.props.resolveConflictsModal(conflict)}>
          <p>{conflict.id}</p>
          <p>{conflict.name}</p>
          <p>{conflict.selectedDraft === null ? "" : drafts[conflict.selectedDraft].name} </p>
          <input
            id={`conflict-${conflict.document}-${conflict.id}`}
            className='conflicts-checkbox-filter'
            type="checkbox"
            checked={ conflict.selectedDraft === null ?  "" : "checked"}
             />
         <label htmlFor={`conflict-${conflict.name}-${conflict.id}`} className='conflicts-checkbox-label'> </label>

        </div>
      </li>
    )
  }


  renderList() {
    return (
      <ul>
        {
          Object.values(this.props.conflicts).map(conflict => {
            return ( this.renderListItem(conflict) )
          })
        }
      </ul>
    )
  }

  render() {
    const { draft1, draft2, winningDraft } = this.props.selectedDrafts;
      return (
        <div className='draft-conflicts-modal'>
          <div>
            <header className='conflicts-header'>
              <h3>Combine Draft Conflicts </h3> <span onClick={this.props.closeModal} className="close-x">x</span>
            </header>

            <section className='draft-conflicts-headers'>
              <h4>Conflict</h4>
              <h4>Document</h4>
              <h4>Draft Version</h4>
              <h4>Resolved</h4>
            </section>

            { this.renderList() }
          </div>

          <footer>
            <div className='choose-draft-footer-text'>
              <p>Use this draft version for all conflicts: </p>
              <select className='select-draft-for-all-conflicts'>
                <option id='default' value="" >-</option>
                <option id='choose-draft1-option' value={draft1} >{draft1}</option>
                <option id='choose-draft2-option' value={draft2} >{draft2}</option>
              </select>
              <input
                id='choose-draft-for-all-conflicts'
                className='choose-draft-checkbox-filter'
                type="checkbox"
                onClick={this.handleChooseDraft.bind(this)}/>
              <label htmlFor='choose-draft-for-all-conflicts' className='choose-draft-checkbox-label'> </label>
            </div>
            <button
              id='combine-drafts-modal-button'
              className='combine-drafts-modal-button'
              onClick={this.handleCombine}>
              Combine Drafts
            </button>
          </footer>
        </div>

      )
  }
}


const mapStateToProps = state => {
  return {
    selectedDrafts: state.ui.selectedDrafts,
    drafts: state.drafts,
    saves: Object.values(state.saves),
    users: state.users,
    conflicts: state.ui.conflicts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchDraft: id => dispatch(fetchDraft(id)),
    resolveConflictsModal: conflict => dispatch(openModal(<ResolveConflictsModal conflict={conflict}/>)),
    updateConflictSelection: conflict => dispatch(updateConflictSelection(conflict)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CombineDraftsModal);
