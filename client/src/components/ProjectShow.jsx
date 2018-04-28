import React from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';

import DocumentListItem from './DocumentListItem';
import NewDocument from './NewDocument';
import SaveHistory from  './SaveHistory';
import DraftForm from './DraftForm';

import { closeModal, openModal } from '../actions';
import { dateTimeFormatter } from '../utils/dateFormatter';
import { fetchProject, fetchDraft } from '../actions/index';

import '../styles/project.css';
import '../styles/stylingMain.css';

class Project extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.projectId !== nextProps.match.params.projectId) {
      this.props.fetchProject(nextProps.match.params.projectId);
    }
  }

  componentWillUnmount() {
    this.props.closeModal();
  }

  renderList() {
    return (
      <ul>
      {
        this.props.revisions.map(doc => {
          return (
            <DocumentListItem
            doc={doc}
            user={find(this.props.users, user => user._id === doc.userId)}
            projectId={this.props.project._id}
            key={doc._id}/>
          )
        })
      }
      </ul>
    )
  }

  render() {
    if (this.props.project === undefined) {
      return <div> </div>
    } else {

      const { project, saves } = this.props;
      const lastSavedDate = dateTimeFormatter(project.updatedAt);

      return (
        <div className='standard-layout'>
          <header className='project-show'>
            <h2> Project: { project.name } </h2>
          </header>
          <main className='main'>
            <aside className='aside-left'>
            </aside>
            <section className='main-list'>
              <div className='draft-drop-down-header'>
                <h4 className="draft-version">
                  Draft Version:
                </h4>
                <div className="draft-drop-down-button">
                  <h4>
                    {this.props.activeDraft.name}
                  </h4>
                  <i className="material-icons">arrow_drop_down</i>
                </div>
              </div>
              <div className="project-header">
                <h3>Documents</h3>
                {this.props.newModal}
              </div>
              <div className='sub-header'>
                <h4>Document Name</h4>
                <div className='doc-header-right'>
                  <h4>Last Modified</h4>
                  <h4>Modified By</h4>
                </div>
              </div>
              { this.renderList() }
              <DraftForm
                activeDraft={this.props.activeDraft}
                project={this.props.project}
                drafts={this.props.drafts}
              />
            </section>
            <aside className='aside-right save-history'>
              {this.props.saveModal}
              <div className="last-save">
                <p> Last saved: </p>
                <p> { lastSavedDate } </p>
              </div>
            </aside>
          </main>
        </div>
      );
    }
  }

}



function mapStateToProps(state, ownProps) {
  const project = state.projects[ownProps.match.params.projectId];
  if (project === undefined || !project.draftIds) return {};
  const activeDraftId = find(state.auth.projectsActiveDraft, el => (
    el.projectId === project._id
  )).draftId;
  const activeDraft = state.drafts[activeDraftId];
  const drafts = project.draftIds.map(id => state.drafts[id]);
  const saves = activeDraft.saveIds.map(id => state.saves[id]);
  const users = saves.map(save => state.users[save.userId]);
  const revisions = Object.keys(saves).length !== 0
    ? saves[saves.length - 1].revisionIds.map(id => state.revisions[id])
    : [];
  return {
    project,
    drafts,
    saves,
    users,
    activeDraft,
    revisions
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProject: id => dispatch(fetchProject(id)),
    fetchDraft: id => dispatch(fetchDraft(id)),
    saveModal: (
      <button onClick={() => dispatch(openModal(<SaveHistory />))}>
        View Save History
      </button>
    ),
    newModal: (
      <div
        className="add-icon"
        onClick={() => dispatch(openModal(<NewDocument projectId={ownProps.match.params.projectId} />))}
      >
        <i className="material-icons new-show">add_circle_outline</i>
        <i className="material-icons md-24 new-hidden">add_circle</i>
      </div>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
