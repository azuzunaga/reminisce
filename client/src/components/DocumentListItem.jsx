import React from 'react';
import { connect } from 'react-redux';
import '../styles/stylingList.css';
import { dateTimeFormatter } from '../utils/dateFormatter';
import { Link } from 'react-router-dom';
import { openModal } from '../actions';
import TitleEditForm from './TitleEditForm';
import ConfirmDeleteForm from './ConfirmDeleteForm';
import pencil from '../assets/pencil-edit-button.png';
class DocumentListItem extends React.Component {
  render() {

    const { doc, user, projectId } = this.props;

    return (
      <li className='list-item'>
        <div className='list-name'>
          <Link to={`/project/${projectId}/document/${doc._id}`}>
            <p>{doc.title}</p>
          </Link>
          <button className="edit-button-pencil"
            onClick={() =>
              this.props.openModal(
                <TitleEditForm
                  document={doc}
                  projectId={projectId}
                />
              )}>
            <img className="pencil" src={pencil} alt="Edit Title"/>
          </button>
          <button
            className="delete-button"
            onClick={
              () => this.props.openModal(
                <ConfirmDeleteForm revisionId={doc._id} projectId={projectId} />
              )
            }>
            ×
          </button>
        </div>
        <div className='doc-list-details'>
          <p>{dateTimeFormatter(doc.createdAt)}</p>
          <p>{user.firstName}</p>
        </div>
      </li>
    );
  }
}



function mapStateToProps({ auth }) {
  return { auth };
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (component) => dispatch(openModal(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListItem);
