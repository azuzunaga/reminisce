import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/stylingList.css';

class DocumentListItem extends React.Component {
  render() {

    const { doc } = this.props;

    return (
      <li className='document-list-item'>
        <div className='list-name'>
          <p> {doc.name} </p>
        </div>
        <div className='doc-list-details'>
          <p>{doc.lastModified}</p>
          <p>{doc.modifiedBy}</p>
        </div>
      </li>
    )
  }
}



function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(DocumentListItem);