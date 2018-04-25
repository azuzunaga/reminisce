import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/stylingList.css';

const dateTimeFormatter = timestamp => {
  let options = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

  let date = new Date(timestamp);
  return date.toLocaleDateString("en-us", options);
}


class SaveListItem extends React.Component {
  render() {

    const { save, users } = this.props;

    const saveTime = dateTimeFormatter(save[0].createdAt)

    return (
      <li className='save-list-item'>
        <p> {save[0].comment} </p>
        <p> {saveTime} </p>
        <p> {users[save[0].userId].firstName} </p>
      </li>
    )
  }
}

export default SaveListItem;
