import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DraftsListItem from './DraftsListItem';
import { closeModal, openModal } from '../actions';
import { fetchProject, setDrafts } from '../actions/index'
import { dateTimeFormatter } from '../utils/dateFormatter';
import CombineDraftsModal from './CombineDraftsModal';
import '../styles/combinedrafts.css';
import '../styles/stylingMain.css';

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

class CombineDrafts extends React.Component {

  constructor(props) {
    super(props);
    this.selectedCounter = 0;
    this.countSelected = this.countSelected.bind(this);
    this.handleCombineModal = this.handleCombineModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectId)
    const combineButton = document.getElementById('combine-selected-drafts-button');
    combineButton.disabled = true;
  }


  countSelected(e) {
    const checkboxes = Array.from(document.getElementsByClassName('checkbox-filter'));
    const checked = checkboxes.filter(checkbox => checkbox.checked === true);
    this.selectedCounter = checked.length;
    const combineButton = document.getElementById('combine-selected-drafts-button');
    if (this.selectedCounter > 2) {
      e.preventDefault();
    } else if (this.selectedCounter === 2) {
      combineButton.classList.add('two-selected');
      combineButton.disabled = false;
      this.props.setDrafts({
        draft1: checked[0].getAttribute('data'),
        draft2: checked[1].getAttribute('data'),
        winningDraft: checked[0].getAttribute('data'),
      })
      this.render();
    } else {
      combineButton.classList.remove('two-selected');
      combineButton.disabled = true;
    }
  }


  renderListItem(draft) {
    return (
      <li className='list-item'>
        <div className='list-left'>
          <input
            id={`draft-${draft.id}`}
            className='checkbox-filter'
            type="checkbox"
            onClick={this.countSelected.bind(this)}
            data={draft.name}
             />
          <label htmlFor={`draft-${draft.id}`} className='checkbox-label'> {draft.name} </label>
        </div>
        <div className='draft-list-details'>
          <p>{draft.lastSaved}</p>
          <p>{draft.savedBy}</p>
        </div>
      </li>
    )
  }

  handleCombineModal(e) {
    const that = this;
    const { draft1, draft2 } = this.props.selectedDrafts;
    const winningDraft = document.getElementById('draft1-option').selected ?
      draft1 : draft2;
    e.preventDefault();
    that.props.setDrafts({
      draft1: draft1,
      draft2: draft2,
      winningDraft: winningDraft,
    });
    that.props.combineDraftsModal();
  }

  renderList() {
    return (
      <ul className="scrollable-list">
      {
        fakeDrafts.map(draft => {
          return ( this.renderListItem(draft) )
        })
      }
      </ul>
    )
  }

  render() {
    const { draft1, draft2 } = this.props.selectedDrafts;
    return (
      <div className='standard-layout'>
        <header className='combine-drafts'>
          <h2>Combine Drafts</h2>
        </header>
          <main className='main'>
            <aside className='aside-left'>
            </aside>
            <section className='main-list'>
              <div className="project-header">
                <h3>Drafts</h3>
                <p className='main-header-helper-text'> (Select 2) </p>
              </div>
              <div className='sub-header'>
                <div className='sub-header-left'>
                  <h4> Draft Version</h4>
                </div>
                <div className='draft-header-right'>
                  <h4>Last Saved</h4>
                  <h4>Saved By</h4>
                </div>
              </div>
              { this.renderList() }
              <div className='combine-drafts-footer'>
                <div className='combine-drafts-text'>
                  <p> Combine drafts into: </p>

                  <select>
                    <option id='draft1-option' value={draft1} selected>{draft1}</option>
                    <option id='draft2-option' value={draft2} >{draft2}</option>
                  </select>
                </div>
                  <button
                    id="combine-selected-drafts-button"
                    className="combine-selected-drafts"
                    onClick={this.handleCombineModal}>
                    Combine
                  </button>
              </div>

            </section>
            <aside className='aside-right'>
            </aside>
          </main>
        </div>

    )
  }
}


const mapStateToProps = state => {
  return {
    modal: state.ui.modal,
    conflicts: state.ui.conflicts,
    selectedDrafts: state.ui.selectedDrafts,
   };
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchProject: id => dispatch(fetchProject(id)),
    setDrafts: drafts => dispatch(setDrafts(drafts)),
    combineDraftsModal: () => dispatch(openModal(<CombineDraftsModal />)),

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CombineDrafts);
