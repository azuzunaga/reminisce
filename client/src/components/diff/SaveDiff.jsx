import React from 'react';
import { connect } from 'react-redux';
import { pickBy } from 'lodash';

import { fetchSave } from '../../actions';
import diffSaves from '../../utils/diffSaves';
import RevisionDiff from './RevisionDiff';

class SaveDiff extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, activeRevisionIdx: 0 };
  }

  componentDidMount() {
    this.props
      .fetchSave(this.props.saveId)
      .then(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <div className="diff-view loading" />;
    }
    const { save, changedRevisions } = this.props;
    return (
      <div className="diff-view">
        <h3>Save: {save.name}</h3>
        <div className="diff-table">
          <ol className="rev-titles">
            {changedRevisions.map((rev, idx) => (
              <li
                onClick={() => this.setState({ activeRevisionIdx: idx })}
                key={rev._id}
                className={idx === this.state.activeRevisionIdx ? 'active' : ''}
                >
                {rev.title}
              </li>
            ))}
          </ol>
          <RevisionDiff rev={changedRevisions[this.state.activeRevisionIdx]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const save = state.saves[ownProps.saveId];
  if (!save) return {};

  const prevSave = state.saves[save.previousSaveId] || { revisionIds: [] };
  if (!prevSave) return {};

  const revisionIds = save.revisionIds.concat(prevSave.revisionIds);
  if (!revisionIds.every( id => state.revisions[id])) return {};

  const changedRevisions = diffSaves(prevSave, save, state.revisions);
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
