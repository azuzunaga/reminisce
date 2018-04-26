import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentListItem from './DocumentListItem';
import NewDocument from './NewDocument';
import { closeModal, openModal } from '../actions';
import { dateTimeFormatter } from '../utils/dateFormatter';
import { fetchProject } from '../actions/index';
import SaveHistory from  './SaveHistory';
import '../styles/project.css';
import '../styles/stylingMain.css';

const fakeDocs = [
  {
    id: 1,
    name: 'Chapter One',
    lastModified: 'Today, 4:00 PM',
    modifiedBy: 'Gabriel',
  },
  {
    id: 2,
    name: 'Chapter Two',
    lastModified: 'Apr 21, 5:00 PM',
    modifiedBy: 'Gabriel',
  },
  {
    id: 3,
    name: 'Chapter Three',
    lastModified: 'Mar 18, 5:00 PM',
    modifiedBy: 'me',
  },
];



class Project extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.projectId !== nextProps.match.params.projectId) {
      this.props.fetchProject(nextProps.match.params.projectId);
    }
  }
  renderList() {
    return (
      <ul>
      {
        fakeDocs.map(doc => {
          return (
            <DocumentListItem
            doc={doc}
            key={doc.id}/>
          )
        })
      }
      </ul>
    )
  }

  render() {
    debugger;  
    const { project } = this.props;
    const lastSaved = dateTimeFormatter(project.updatedAt);

    return (
      <div className='standard-layout'>
        <header className='project-show'>
          <h2> Project: { project.name } </h2>
        </header>
        <main className='main'>
          <aside className='aside-left'>
          </aside>
          <section className='main-list'>
            <h4 className="draft-version">Draft Version: <span></span></h4>
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
          </section>
          <aside className='aside-right save-history'>
            {this.props.saveModal}
            <div className="last-save">
              <p> Last save: { lastSaved } </p>
              <p> Fixed last paragraph </p>
            </div>
          </aside>
        </main>
        </div>

    )
  }
}



function mapStateToProps(state, ownProps) {
  return {
    project: state.projects[ownProps.match.params.projectId],
    drafts: state.drafts
  }

};

const mapDispatchToProps = dispatch => {
  return {
    fetchProject: id => dispatch(fetchProject(id)),
    saveModal: (
      <button onClick={() => dispatch(openModal(<SaveHistory />))}>
        View Save History
      </button>
    ),
    newModal: (
      <div
        className="add-icon"
        onClick={() => dispatch(openModal(<NewDocument />))}
      >
        <i className="material-icons new-show">add_circle_outline</i>
        <i className="material-icons md-24 new-hidden">add_circle</i>
      </div>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
