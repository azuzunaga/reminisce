import React from 'react';
import { connect } from 'react-redux';
import '../styles/stylingList.css';
import '../styles/combinedrafts.css';

class DraftsListItem extends React.Component {


  constructor(props) {
    super(props);
    this.selectedCounter = 0;
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  toggleSelect() {
    return e => {
      this.selectedCounter += 1;
      console.log(this.selectedCounter);
    }
  }
  render() {

    const { draft } = this.props;

    return (
      <li className='list-item'>
        <div className='list-left'>
          <input
            id={`draft-${draft.id}`}
            className='checkbox-filter'
            type="checkbox"
            onClick={this.toggleSelect()}
             />
          <label htmlFor={`draft-${draft.id}`} className='checkbox-label'></label>
          <p> {draft.name} </p>
        </div>
        <div className='draft-list-details'>
          <p>{draft.lastSaved}</p>
          <p>{draft.savedBy}</p>
        </div>
      </li>
    )
  }
}



function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(DraftsListItem);
