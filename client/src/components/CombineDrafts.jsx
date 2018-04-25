import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DraftsListItem from './DraftsListItem';
import '../styles/combinedrafts.css';
import '../styles/stylingMain.css';

const fakeDrafts = [
  {
    id: 1,
    name: 'Fact Checked',
    description: 'Fully fact checked draft',
    lastSaved: 'Today, 4:00 PM',
    savedBy: 'Gabriel',
  },
  {
    id: 2,
    name: 'Alternate Ending',
    description: 'Where Abraham Lincoln did not die by assasination and lived a long healthy life.',
    lastSaved: 'Apr 21, 5:00 PM',
    savedBy: 'me',
  },
  {
    id: 3,
    name: 'Not Fact Checked',
    description: 'Churned out a lot of chapters without fact checking them.',
    lastSaved: 'Mar 18, 5:00 PM',
    savedBy: 'Americo',
  },
];

class CombineDrafts extends React.Component {
  renderList() {
    return (
      <ul>
      {
        fakeDrafts.map(draft => {
          return (
            <DraftsListItem
            draft={draft}
            key={draft.id}/>
          )
        })
      }
      </ul>
    )
  }

  render() {
    return (
      <div className='standard-layout'>
        <header className='combine-drafts'>
          <h2>Combine Drafts</h2>
        </header>
          <main className='main'>
            <aside className='aside-left'>
            </aside>
            <section className='main-list'>
              <h3>Projects</h3>
              <div className='sub-header'>
                <div className='sub-header-left'>
                  <h4> Select Draft </h4>
                  <h4> Draft Name</h4>
                </div>
                <div className='draft-header-right'>
                  <h4>Last Saved</h4>
                  <h4>Saved By</h4>
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

export default connect(mapStateToProps)(CombineDrafts);
