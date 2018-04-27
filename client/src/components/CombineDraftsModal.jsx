import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { fetchDraft } from '../actions/index'
import SaveListItem from'./SaveListItem'
import '../styles/draftConflicts.css'

const fakeDrafts = [
  {
    id: 1,
    name: 'Fact Checked',
    description: 'Fully fact checked draft',
    lastSaved: 'Today, 4:00 PM',
    savedBy: 'Gabriel',
  },
  {
    id: 2,
    name: 'Alternate Ending',
    description: 'Where Abraham Lincoln did not die by assasination and lived a long healthy life.',
    lastSaved: 'Apr 21, 5:00 PM',
    savedBy: 'me',
  },
  {
    id: 3,
    name: 'Not Fact Checked',
    description: 'Churned out a lot of chapters without fact checking them.',
    lastSaved: 'Mar 18, 5:00 PM',
    savedBy: 'Americo',
  },
];


const draftConflicts = [
  {
    document: 'Chapter One',
    paragraph: 4,
    draft1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    document: 'Chapter One',
    paragraph: 35,
    draft1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    document: 'Chapter Two',
    paragraph: 7,
    draft1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },

  {
    document: 'Chapter Three',
    paragraph: 15,
    draft1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    document: 'Chapter Three',
    paragraph: 20,
    draft1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    draft2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },

]

class CombineDraftsModal extends React.Component {
  componentDidMount() {
  }

  renderListItem(conflict) {
    return (
      <li className='draft-conflicts-list-item'
      key={`conflict-${conflict.document}-${conflict.paragraph}`}>
        <p>{conflict.document}</p>
        <p>{conflict.paragraph}</p>
        <input
          id={`conflict-${conflict.document}-${conflict.paragraph}`}
          className='checkbox-filter'
          type="checkbox"
           />
        <label htmlFor={`conflict-${conflict.document}-${conflict.paragraph}`} className='checkbox-label'> </label>
      </li>
    )
  }


  renderList() {
    return (
      <ul>
        {
          draftConflicts.map(conflict => {
            return ( this.renderListItem(conflict) )
          })
        }
      </ul>
    )
  }

  render() {
      return (
        <div className='draft-conflicts-modal'>
          <header>
            <h3>Draft Conflicts </h3> <span onClick={this.props.closeModal} className="close-x">x</span>
          </header>

          <section className='draft-conflicts-headers'>
            <h4>Document</h4>
            <h4>Paragraph</h4>
            <h4>Resolved</h4>
          </section>

          { this.renderList() }
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CombineDraftsModal);
