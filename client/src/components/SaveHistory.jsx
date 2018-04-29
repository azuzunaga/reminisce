import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { fetchDraft } from '../actions/index'

import SaveListItem from'./SaveListItem'
import '../styles/saveHistory.css'

class SaveHistoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.hideAutoSaves = true;
    this.handleShowAutos = this.handleShowAutos.bind(this);
  }

  componentDidMount() {
    this.props.fetchDraft(this.props.draft._id)
  }

  handleShowAutos() {
    this.hideAutoSaves = !this.hideAutoSaves;
    this.renderList();
    this.render();

  }


  renderList() {
    const { users, saves } = this.props;
    let reversed = saves.slice(1).reverse();
    debugger;

    if (this.hideAutoSaves) {
      reversed = reversed.filter( save => !save.isAuto)
      debugger;
    }

    return (
      <ul className='save-list-items scrollable-list'>
        {
          reversed.map(save => {
            return (
              <SaveListItem
              save={save}
              users={users}
              key={save.id} />
            )
          })
        }
      </ul>
    )
  }

  render() {
    const { saves } =  this.props
    const autoSaveText = this.hideAutoSaves ? "Show Auto-Saves" : "Hide Auto-Saves";

    if ( saves.length === 0 ) {
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
              onClick={() => this.handleShowAutos()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SaveHistoryModal);
