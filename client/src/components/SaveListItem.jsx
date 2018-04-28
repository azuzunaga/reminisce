import React from 'react';
import { dateTimeFormatter } from '../utils/dateFormatter';
import '../styles/stylingList.css';



class SaveListItem extends React.Component {
  render() {

    const { save, users } = this.props;
    console.log(save);
    const saveTime = dateTimeFormatter(save.createdAt)

    return (
      <li className='save-list-item'>
        <p> {save.name} </p>
        <p> {saveTime} </p>
        <p> {users[save.userId].firstName} </p>
      </li>
    )
  }
}

export default SaveListItem;
