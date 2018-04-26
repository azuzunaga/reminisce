import React from 'react';
import { connect } from 'react-redux';
import { pickBy } from 'lodash';

import { fetchSave } from '../../actions';
import diffSaves from '../../utils/diff';
import RevisionDiff from "./RevisionDiff";

class SaveDiff extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    this.props
      .fetchSave(this.props.saveId)
      .then(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <div className="loading" />;
    }
    const { save, prevSave, changedRevisions } = this.props;
    return (
      <div className="diff-view">
        <h3>Save: {save.name}</h3>
        <ul>
          {changedRevisions.map(rev => (
            <RevisionDiff key={rev._id} rev={rev} />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const save = state.saves[ownProps.saveId];
  if (!save) return {};
  const prevSave = state.saves[save.previousSaveId] || { revisionIds: [] };
  const revisions = pickBy(
    state.revisions,
    (rev, id) =>
      prevSave.revisionIds.includes(id) || save.revisionIds.includes(id)
  );
  const changedRevisions = diffSaves(prevSave, save, revisions);
  return {
    save,
    prevSave,
    changedRevisions
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSave: id => dispatch(fetchSave(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDiff);
