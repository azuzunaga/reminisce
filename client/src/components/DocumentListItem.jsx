import React from 'react';
import { connect } from 'react-redux';
import '../styles/stylingList.css';
import { dateTimeFormatter } from '../utils/dateFormatter';
import { Link } from 'react-router-dom';
import { openModal, createSave } from '../actions';
import TitleEditForm from './TitleEditForm';
import ConfirmDeleteForm from './ConfirmDeleteForm';
class DocumentListItem extends React.Component {
  render() {

    const { doc, user, projectId, draftId } = this.props;

    return (
      <li className='list-item document' key={doc._id}>
        <div className="wrap">
          <p className='doc-title'>
            <Link to={`/project/${projectId}/document/${doc._id}`}>
            {doc.title}
            </Link>
          </p>

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
          <button
            className="delete-button"
            onClick={
              () => this.props.openModal(
                <ConfirmDeleteForm
                message="Are you sure you want to delete this document?"
                action={this.props.deleteDocument(doc, draftId)} />
              )
            }>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <p>{dateTimeFormatter(doc.createdAt)}</p>
        <p>{user.firstName}</p>
      </li>
    );
  }
}



function mapStateToProps(state, ownProps) {
  let activeDraftArr = state.auth.projectsActiveDraft;
  let idx = activeDraftArr.findIndex(
    el => el.projectId === ownProps.projectId
  );
  let draftId = activeDraftArr[idx].draftId;
  return {
    auth: state.auth,
    draftId
  };
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (component) => dispatch(openModal(component)),
  deleteDocument: (revision, draftId) => () => {
    const save = Object.assign({}, {
      save: { name: `Delete Document: ${revision.title}`,
        draftId: draftId, isAuto: false },
        newRevs: [],
        deletedRevIds: [revision._id]
    });
    return dispatch(createSave(save));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListItem);
