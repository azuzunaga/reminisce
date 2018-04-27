import React from 'react';
import { connect } from 'react-redux';
import '../styles/stylingList.css';
import { dateTimeFormatter } from '../utils/dateFormatter';

class DocumentListItem extends React.Component {
  render() {

    const { doc, user } = this.props;

    return (
      <li className='list-item'>
        <div className='list-name'>
          <Link to={`/document/${doc._id}`}>
            <p> {doc.title} </p>
          </Link>
        </div>
        <div className='doc-list-details'>
          <p>{dateTimeFormatter(doc.createdAt)}</p>
          <p>{user.firstName}</p>
        </div>
      </li>
    )
  }
}



function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(DocumentListItem);
