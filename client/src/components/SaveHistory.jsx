import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';

import SaveListItem from'./SaveListItem'
import '../styles/saveHistory.css'

const saves =  [
    {
      ae0bd594104c027b3f22bb6: {
        previousSaveId: null,
        isAuto: false,
        revisionIds: [
          "5ae0bd594104c027b3f22bb4",
          "5ae0bd594104c027b3f22bb5"
          ],
        createdAt: "2018-04-25T17:39:37.359Z",
        _id: "5ae0bd594104c027b3f22bb6",
        comment: "fixed last paragraph",
        draftId: "5adfcc6a4f29bb8265378684",
        userId: "5ade8099634c20110b16e92e",
        projectId: "5adfcc6a4f29bb8265378683",
        __v: 0
      }
    },
    {
      ae0bdf84104c027b3f22bb9: {
        previousSaveId: null,
        isAuto: false,
        revisionIds: [
          "5ae0bd594104c027b3f22bb4",
          "5ae0bd594104c027b3f22bb5",
          "5ae0bdf84104c027b3f22bb7",
          "5ae0bdf84104c027b3f22bb8"
        ],
        createdAt: "2018-04-25T17:42:16.734Z",
        _id: "5ae0bdf84104c027b3f22bb9",
        comment: "started chapter two",
        draftId: "5adfcc6a4f29bb8265378684",
        userId: "5ade8099634c20110b16e92e",
        projectId: "5adfcc6a4f29bb8265378683",
        __v: 0
      }
    },
    {
      ae0bdf84104c027b3f22b234: {
        previousSaveId: null,
        isAuto: false,
        revisionIds: [
          "5ae0bd594104c027b3f22bb4",
          "5ae0bd594104c027b3f22bb5",
          "5ae0bdf84104c027b3f22bb7",
          "5ae0bdf84104c027b3f22bb8"
        ],
          createdAt: "2018-04-25T19:42:16.734Z",
          _id: "5ae0bdf84104c027b3f22bb9",
          comment: "completed chapter two",
          draftId: "5adfcc6a4f29bb8265378684",
          userId: "5ade8099634c20110b16e92e",
          projectId: "5adfcc6a4f29bb8265378683",
          __v: 0
    }
  }
]

const users = {
  "5ade8099634c20110b16e92e": {
    firstName: 'Kimberly',
    lastName: 'Hu',
    username: 'kimberly.hu@gmail.com'
  }
}


class SaveHistoryModal extends React.Component {
  renderList() {
    return (
      <ul>
        {
          saves.map(save => {
            return (
              <SaveListItem
              save={Object.values(save)}
              users={users}
              key={save.id} />
            )
          })
        }
      </ul>
    )
  }

  render() {
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


const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveHistoryModal);
