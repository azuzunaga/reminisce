import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentListItem from './DocumentListItem';
import '../styles/project.css';
import '../styles/stylingMain.css';

const currentProject = {
  name: 'History of Abraham Lincoln'
}
const fakeDocs = [
  {
    id: 1,
    name: 'Chapter One',
    lastModified: 'Today 4:00 PM',
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
              <h3>Documents</h3>
              <div className='sub-header'>
                <h4>Document Name</h4>
                <div className='doc-header-right'>
                  <h4>Last Modified</h4>
                  <h4>Modified By</h4>
                </div>
              </div>
              <ul>
                { this.renderList() }
              </ul>
            </section>
            <aside className='aside-right'>
            </aside>
          </main>
        </div>

    )
  }
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Project);
