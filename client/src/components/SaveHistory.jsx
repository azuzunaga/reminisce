import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { fetchDraft } from '../actions/index'

import SaveListItem from'./SaveListItem'
import '../styles/saveHistory.css'

class SaveHistoryModal extends React.Component {
  componentDidMount() {
    this.props.fetchDraft(this.props.draft._id)
  }


  renderList() {
    const { users, saves } = this.props;
    const reversed = saves.reverse();
    return (
      <ul>
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

          <ul>
            { this.renderList() }
          </ul>
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
