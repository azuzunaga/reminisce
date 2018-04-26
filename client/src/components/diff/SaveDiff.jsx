import React from 'react';
import { connect } from 'react-redux';
import { pickBy } from 'lodash';

import { fetchSave } from '../../actions';
import diffSaves from '../../utils/diff';
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
    const { save, prevSave, changedRevisions } = this.props;
    return (
      <div className="diff-view">
        <h3>Save: {save.name}</h3>
        <header>
          <div>Title</div>
        </header>
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
