import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { closeModal } from '../actions';
import { fetchDraft } from '../actions/index'

import SaveListItem from'./SaveListItem'
import '../styles/saveHistory.css'

class SaveHistoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.hideAutoSaves = true;
    this.state = {
      saveHistory: this.hideAutoSaves,
    }

    this.toggleShowAutos = this.toggleShowAutos.bind(this);
  }

  componentDidMount() {
    this.props.fetchDraft(this.props.draft._id)
  }


  componentWillReceiveProps(nextProps) {
    debugger;
    if (this.props.draft._id != nextProps.draft._id) {
      this.props.fetchDraft(nextProps.draft._id);
    }
  }

  toggleShowAutos() {
    this.hideAutoSaves = !this.hideAutoSaves;
    this.setState(
      { saveHistory: this.hideAutoSaves }
    )
  }


  renderList() {
    const { users, saves, draft } = this.props;

    const draftSaves = draft.saveIds.map(id => saves[id]);
    let reversed = draftSaves.slice(1).reverse();

    if (this.hideAutoSaves) {
      reversed = reversed.filter( save => !save.isAuto)
    }

    return (
      <ul className='save-list-items scrollable-list'>
        {
          reversed.map(save => {

            return (
              <SaveListItem
              save={save}
              users={users}
              key={save._id} />
            )
          })
        }
      </ul>
    )
  }

  render() {
    const { saves, draft } =  this.props
    const autoSaveText = this.hideAutoSaves ? "Show Auto-Saves" : "Hide Auto-Saves";

    if ( draft.saveIds.length === 0 ) {
      return <div> </div>
    } else {
      return (
        <div className='save-history-modal'>
          <header>
            <h3>Save History </h3> <span onClick={this.props.closeModal} className="close-x">x</span>
          </header>

          <section className='save-history-headers'>
            <h4>Save Message</h4>
            <h4>Save Time</h4>
            <h4>Saved By</h4>
          </section>
            { this.renderList() }
          <footer>
            <p className='show-auto-saves'
              onClick={() => this.toggleShowAutos()}
            > {autoSaveText}</p>
          </footer>
        </div>
      )
    }
  }
}


const mapStateToProps = state => {
  return {
    modal: state.ui.modal,
    draft: Object.values(state.drafts)[0],
    saves: state.saves,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchDraft: id => dispatch(fetchDraft(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaveHistoryModal));
