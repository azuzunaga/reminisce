import { connect } from 'react-redux';
import React from 'react';
import '../styles/titleErrorsModal.css';
class TitleErrorModal extends React.Component {
  render () {
    let errors = this.props.errors;
    errors = errors.map((error, i) =>
      <li key={i}>{error}</li>
    );

    return (
      <ul className="title-change-errors">
        {errors}
      </ul>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps)(TitleErrorModal);
