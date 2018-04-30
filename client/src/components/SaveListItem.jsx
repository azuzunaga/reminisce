//libraries
import React from 'react';
import { connect } from 'react-redux';

//utils
import { dateTimeFormatter } from '../utils/dateFormatter';
import { closeModal, openModal } from '../actions';
import { fetchSave } from '../actions/index';

//component & styling
import SaveDiff from "./diff/SaveDiff";
import '../styles/stylingList.css';

class SaveListItem extends React.Component {
  render() {

    const { save, users } = this.props;
    const saveTime = dateTimeFormatter(save.createdAt)

    return (
      <li key={save._id}
        className='save-list-item'
        onClick={() => this.props.saveDiff(save._id, this.props.activeDraft)}>
        <p> {save.name} </p>
        <p> {saveTime} </p>
        <p> {users[save.userId].firstName} </p>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveDiff: (id, activeDraft) => dispatch(openModal(<SaveDiff saveId={id} activeDraft={activeDraft}/>)),
    closeModal: () => dispatch(closeModal()),
    fetchSave: id => dispatch(fetchSave(id)),
  }
}
export default connect(null, mapDispatchToProps)(SaveListItem);
