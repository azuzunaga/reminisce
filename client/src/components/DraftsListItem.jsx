import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/stylingList.css';
import '../styles/combinedrafts.css';

class DraftsListItem extends React.Component {
  render() {

    const { draft } = this.props;

    return (
      <li className='list-item'>
        <div className='list-left'>
          <input id={`draft-${draft.id}`}className='checkbox-filter' type="checkbox" />
          <label htmlFor={`draft-${draft.id}`} className='checkbox-label'></label>
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
