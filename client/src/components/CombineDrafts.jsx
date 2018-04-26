import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DraftsListItem from './DraftsListItem';
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
    this.toggleSelect = this.toggleSelect.bind(this);
    this.countSelected = this.countSelected.bind(this);
  }

  toggleSelect() {
    return e => {
      this.selectedCounter += 1;
      console.log(this.selectedCounter);
    }
  }

  countSelected() {
    return e => {
      const checkboxes = Array.from(document.getElementsByClassName('checkbox-filter'));
      let selected = 0;

      checkboxes.forEach(checkbox => {
        if (checkbox.checked === true) selected += 1;
      })

      this.selectedCounter = selected;
      const combineButton = document.getElementById('combine-selected-drafts-button');

      if (this.selectedCounter === 2) {
        combineButton.classList.add('two-selected');
      } else {
        combineButton.classList.remove('two-selected');
      }
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
            onClick={this.countSelected()}
             />
          <label htmlFor={`draft-${draft.id}`} className='checkbox-label'></label>
          <p> {draft.name} </p>
        </div>
        <div className='draft-list-details'>
          <p>{draft.lastSaved}</p>
          <p>{draft.savedBy}</p>
        </div>
      </li>
    )
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
                  <h4> Select </h4>
                  <h4> Draft Name</h4>
                </div>
                <div className='draft-header-right'>
                  <h4>Last Saved</h4>
                  <h4>Saved By</h4>
                </div>
              </div>
                { this.renderList() }
              <button id="combine-selected-drafts-button"
              className='combine-selected-drafts'> Combine Selected Drafts </button>
            </section>
            <aside className='aside-right'>
            </aside>
          </main>
        </div>

    )
  }
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(CombineDrafts);
