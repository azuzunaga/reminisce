import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/stylingList.css';

class DraftsListItem extends React.Component {
  render() {

    const { draft } = this.props;

    return (
      <li className='draft-list-item'>
        <div className='list-left'>
          <input type="checkbox" />
          <p> {draft.name} </p>
        </div>
        <div className='draft-list-details'>
          <p>{draft.lastSaved}</p>
          <p>{draft.savedBy}</p>
        </div>
      </li>
    )
  }
}



function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(DraftsListItem);
