import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { dateTimeFormatter } from '../utils/dateFormatter';
import '../styles/stylingList.css';



class SaveListItem extends React.Component {
  render() {

    const { save, users } = this.props;

    const saveTime = dateTimeFormatter(save.createdAt)

    return (
      <li className='save-list-item'>
        <p> {save.comment} </p>
        <p> {saveTime} </p>
        <p> {users[save.userId].firstName} </p>
      </li>
    )
  }
}

export default SaveListItem;
