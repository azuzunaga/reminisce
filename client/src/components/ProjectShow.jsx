import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentListItem from './DocumentListItem';
import { closeModal, openModal } from '../actions';
import SaveHistory from  './SaveHistory';
import '../styles/project.css';
import '../styles/stylingMain.css';

const currentProject = {
  name: 'History of Abraham Lincoln'
}
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
    return (
      <div className='standard-layout'>
        <header className='project-show'>
          <h2> Project: {currentProject.name} </h2>
        </header>
        <main className='main'>
          <aside className='aside-left'>
          </aside>
          <section className='main-list'>
            <h4 className="draft-version">Draft Version: <span>{this.props.save.comment}</span></h4>
            <h3>Documents</h3>
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
            {this.props.openModal}
            <div className="last-save">
              <p> Last save: Apr 18, 5:00 PM </p>
              <p> Fixed last paragraph </p>
            </div>
          </aside>
        </main>
        </div>

    )
  }
}



function mapStateToProps(state) {
  return { document: { name: "Chapter One" },
          save: {comment: 'Not fact checked'}};
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: (
      <button onClick={() => dispatch(openModal(<SaveHistory />))}>
        View Save History
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
