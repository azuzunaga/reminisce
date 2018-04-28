import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DraftsListItem from './DraftsListItem';
import { closeModal, openModal } from '../actions';
import { fetchProject, setDrafts, fetchMerge } from '../actions/index'
import { dateTimeFormatter } from '../utils/dateFormatter';
import CombineDraftsModal from './CombineDraftsModal';
import '../styles/combinedrafts.css';
import '../styles/stylingMain.css';

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
    const { saves, users } = this.props;
    const lastSaved = dateTimeFormatter(draft.updatedAt);
    const savedByUserId = Object.values(saves).reverse()[0].userId;
    const savedByUserName = users[savedByUserId].firstName

    return (
      <li className='list-item'>
        <div className='list-left'>
          <input
            id={`draft-${draft._id}`}
            className='checkbox-filter'
            type="checkbox"
            onClick={this.countSelected.bind(this)}
            data={draft._id}
            key={draft._id}
             />
          <label htmlFor={`draft-${draft._id}`} className='checkbox-label'> {draft.name} </label>
        </div>
        <div className='draft-list-details'>
          <p>{lastSaved}</p>
          <p>{savedByUserName}</p>
        </div>
      </li>
    )
  }

  handleCombineModal(e) {
    const that = this;
    const { draft1, draft2 } = this.props.selectedDrafts;
    const winningDraft = document.getElementById('draft1-option').selected ?
      draft1 : draft2;

    const losingDraft = document.getElementById('draft1-option').selected ?
      draft2 : draft1;
    e.preventDefault();
    that.props.setDrafts({
      draft1: draft1,
      draft2: draft2,
      winningDraft: winningDraft,
    });
    that.props.combineDraftsModal();
    that.props.fetchMerge({
      mainDraftId: winningDraft,
      mergeDraftId: losingDraft,
    })

  }

  renderList() {
    const { drafts } = this.props;
    const draftKeys = Object.keys(drafts)
    return (
      <ul className="scrollable-list">
      {
        draftKeys.map( draftId => {
          return ( this.renderListItem(drafts[draftId]) )
        })
      }
      </ul>
    )
  }

  render() {
    const { drafts } = this.props;
    const { draft1, draft2 } = this.props.selectedDrafts;
    const draft1Name = drafts[draft1] ? drafts[draft1].name : "";
    const draft2Name = drafts[draft2] ? drafts[draft2].name : "";

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
                    <option id='draft1-option' value={draft1} selected>{draft1Name}</option>
                    <option id='draft2-option' value={draft2} >{draft2Name}</option>
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
    drafts: state.drafts,
    saves: state.saves,
    users: state.users,
   };
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchProject: id => dispatch(fetchProject(id)),
    setDrafts: drafts => dispatch(setDrafts(drafts)),
    combineDraftsModal: () => dispatch(openModal(<CombineDraftsModal />)),
    fetchMerge: params => dispatch(fetchMerge(params)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CombineDrafts);
