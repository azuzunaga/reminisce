import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectsListItem from './ProjectsListItem';
import '../styles/dashboard.css';
import '../styles/stylingMain.css';

const fakeProjects = [
  {
    id: 1,
    name: 'Scary Screenplay',
    description: 'Dark Thriller inspired by Edward Scissorhands',
    owner: 'Gabriel',
    lastModified: 'Today 4:00 PM',
    modifiedBy: 'Gabriel',
  },
  {
    id: 2,
    name: 'History of Abraham Lincoln',
    description: 'Well researched dissertation on the upbringing of Abraham Lincoln',
    owner: 'me',
    lastModified: 'Apr 21, 5:00 PM',
    modifiedBy: 'Gabriel',
  },
  {
    id: 3,
    name: 'Chinese Cookbook',
    description: 'Cuisine from the motherland',
    owner: 'Kimmy',
    lastModified: 'Mar 18, 5:00 PM',
    modifiedBy: 'me',
  },
];

class ProjectsDashboard extends React.Component {
  renderList() {
    return (
      <ul>
      {
        fakeProjects.map(project => {
          return (
            <ProjectsListItem
            project={project}
            key={project.id}/>
          )
        })
      }
      </ul>
    )
  }

  render() {
    return (
      <div className='standard-layout'>
        <header>
          <h2> Projects Dashboard </h2>
        </header>
          <main className='main'>
            <aside className='aside-left'>
            </aside>
            <section className='main-list'>
              <h3>Projects</h3>
              <div className='sub-header'>
                <h4>Project Name</h4>
                <div className='sub-header-right'>
                  <h4>Owner</h4>
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

export default connect(mapStateToProps)(ProjectsDashboard);