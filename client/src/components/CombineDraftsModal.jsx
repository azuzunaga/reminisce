import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import { fetchDraft, setAllConflicts } from '../actions/index';
import ResolveConflictsModal from './ResolveConflictsModal.jsx';
import '../styles/draftConflicts.css';


const draftConflicts = {
  1: {
    document: 'Chapter One',
    id: 1,
    contextBefore: 'before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context before context before context before context before context before context  before context before context  before context before context  before context before context',
    draft1: 'draft1-Lorem ipsum dolor sit amet, ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'draft2-four score and 7 years ago,  ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    contextAfter:'after context after context after context after context after context  after context after context  after context after context  after context after context context after context after context after context  after context after context  after context after context  after context after context context after context after context after context  after context after context  after context after context  after context after context',
    selectedDraft: null,
  },
  2: {
    document: 'Chapter One',
    id: 2,
    contextBefore: 'before context before context before context before context before context  before context before context  before context before context  before context before context',
    draft1: 'draft1-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'draft2-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    contextAfter:'after context after context after context after context after context  after context after context  after context after context  after context after context',
    selectedDraft: null,
  },
  3: {
    document: 'Chapter Two',
    id: 3,
    contextBefore: 'before context before context before context before context before context  before context before context  before context before context  before context before context',
    draft1: 'draft1-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'draft2-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    contextAfter:'after context after context after context after context after context  after context after context  after context after context  after context after context',
    selectedDraft: null,
  },
  4: {
    document: 'Chapter Three',
    id: 4,
    contextBefore: 'before context before context before context before context before context  before context before context  before context before context  before context before context',
    draft1: 'draft1-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'draft2-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    contextAfter:'after context after context after context after context after context  after context after context  after context after context  after context after context',
    selectedDraft: 12345,
  },
  5: {
    document: 'Chapter Three',
    id: 5,
    contextBefore: 'before context before context before context before context before context  before context before context  before context before context  before context before context',
    draft1: 'draft1-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'draft2-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    contextAfter:'after context after context after context after context after context  after context after context  after context after context  after context after context',
    selectedDraft: null,
  }
}

class CombineDraftsModal extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Object.keys(this.props.conflicts).length === 0) {
      this.props.setAllConflicts(draftConflicts);
    }
    // 1. Using the selected drafts --> perform conflict algorithm.
    // 2. Push selected drafts into UI conflcits reducer
    // 3. Display results from UI conflicts reducer
  }

  renderListItem(conflict) {
    return (
      <li className='draft-conflicts-list-item'
      key={`conflict-${conflict.document}-${conflict.id}`}>
        <div className='draft-conflicts-resolve'
          onClick={() => this.props.resolveConflictsModal(conflict)}>
          <p>{conflict.id}</p>
          <p>{conflict.document}</p>
          <input
            id={`conflict-${conflict.document}-${conflict.id}`}
            className='checkbox-filter'
            type="checkbox"
            checked={ conflict.selectedDraft === null ?  "" : "checked"}
             />
         <label htmlFor={`conflict-${conflict.document}-${conflict.id}`} className='checkbox-label'> </label>

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
      return (
        <div className='draft-conflicts-modal'>
          <div>
            <header className='conflicts-header'>
              <h3>Combine Draft Conflicts </h3> <span onClick={this.props.closeModal} className="close-x">x</span>
            </header>

            <section className='draft-conflicts-headers'>
              <h4>Conflict</h4>
              <h4>Document</h4>
              <h4>Resolved</h4>
            </section>

            { this.renderList() }
          </div>

          <footer>
            <p>Use draft ___ for all for all conflicts</p>
            <button>Combine Drafts</button>
          </footer>
        </div>

      )
  }
}


const mapStateToProps = state => {
  return {
    modal: state.ui.modal,
    draft: Object.values(state.drafts)[0],
    saves: Object.values(state.saves),
    users: state.users,
    conflicts: state.ui.conflicts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchDraft: id => dispatch(fetchDraft(id)),
    setAllConflicts: conflicts => dispatch(setAllConflicts(conflicts)),
    resolveConflictsModal: conflict => dispatch(openModal(<ResolveConflictsModal conflict={conflict}/>)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CombineDraftsModal);
