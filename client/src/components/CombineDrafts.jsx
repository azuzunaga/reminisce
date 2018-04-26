import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DraftsListItem from './DraftsListItem';
import { closeModal, openModal } from '../actions';
import { fetchProject } from '../actions/index'
import { dateTimeFormatter } from '../utils/dateFormatter';
import CombineModal from './CombineDraftsModal';
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
    this.state = {
      draft1: null,
      draft2: null,
      tester: 'hello'
    }
    this.countSelected = this.countSelected.bind(this);
  }

  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectId)
  }


  countSelected(e) {
    const checkboxes = Array.from(document.getElementsByClassName('checkbox-filter'));
    const checked = checkboxes.filter(checkbox => checkbox.checked === true)
    this.selectedCounter = checked.length;
    const combineButton = document.getElementById('combine-selected-drafts-button');
    if (this.selectedCounter > 2) {
      e.preventDefault();
    } else if (this.selectedCounter === 2) {
      combineButton.classList.add('two-selected');
      combineButton.disabled = false;
      this.setState({draft1: checked[0].getAttribute('data')});
      this.setState({draft2: checked[1].getAttribute('data')}, () => console.log(this.state))
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
            data={draft.id}
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
                  <h4> Draft Name</h4>
                </div>
                <div className='draft-header-right'>
                  <h4>Last Saved</h4>
                  <h4>Saved By</h4>
                </div>
              </div>
                { this.renderList() }
                { this.props.combineModal }
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

const mapDispatchToProps = dispatch => {
  return {
    combineModal: (
      <button
        id="combine-selected-drafts-button"
        className="combine-selected-drafts"
        onClick={() => {
          dispatch(openModal(<CombineModal
            />))
          }}>
        Combine Selected Drafts
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
    fetchProject: id => dispatch(fetchProject(id)),

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CombineDrafts);
