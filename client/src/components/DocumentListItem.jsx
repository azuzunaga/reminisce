import React from 'react';
import { connect } from 'react-redux';
import '../styles/stylingList.css';
import { dateTimeFormatter } from '../utils/dateFormatter';
import { Link } from 'react-router-dom';
import { openModal } from '../actions';
import TitleEditForm from './TitleEditForm';
import pencil from '../assets/pencil-edit-button.png';
class DocumentListItem extends React.Component {
  render() {

    const { doc, user, projectId } = this.props;

    return (
      <li className='list-item document'>
        <button className="edit-button-pencil"
          onClick={() =>
            this.props.openModal(
              <TitleEditForm
                document={doc}
                projectId={projectId}
              />
            )}>
            <i className="fa fa-pencil"></i>
        </button>
        <Link to={`/project/${projectId}/document/${doc._id}`}>
          <p className='doc-title'> {doc.title}</p>
          <p>{dateTimeFormatter(doc.createdAt)}</p>
          <p>{user.firstName}</p>
        </Link>
      </li>
    )
  }
}



function mapStateToProps({ auth }) {
  return { auth };
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (component) => dispatch(openModal(component))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListItem);
