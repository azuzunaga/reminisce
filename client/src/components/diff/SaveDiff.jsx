//libraries
import React from 'react';
import { connect } from 'react-redux';
import { pickBy } from 'lodash';

//utils & actions
import { fetchSave } from '../../actions';
import diffSaves from '../../utils/diffSaves';
import { dateTimeFormatter } from '../../utils/dateFormatter';
import { openModal, closeModal } from '../../actions';

//components
import RevisionDiff from './RevisionDiff';
import SaveHistoryModal from '../SaveHistory';



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
    if (this.state.loading || !this.props.save) {
      return <div className="diff-view loading" />;
    }
    const { save, changedRevisions } = this.props;

    const saveTime = dateTimeFormatter(save.createdAt)
    debugger;
    return (
      <div className="diff-view">
        <h3>
          <div>Document: {changedRevisions[0].title} <span> (changes since previous save) </span></div>
          <strong onClick={() => this.props.saveHistoryModal(this.props.activeDraft)} className="close-x">x</strong>
        </h3>

        <h4>Save:  {save.name} | {saveTime}  </h4>
        <div className="diff-table">
          <RevisionDiff rev={changedRevisions[this.state.activeRevisionIdx]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const save = state.saves[ownProps.saveId];
  if (!save) return {};

  const prevSave = state.saves[save.previousManualSaveId] || { revisionIds: [] };
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
  fetchSave: id => dispatch(fetchSave(id)),
  saveHistoryModal: activeDraft => dispatch(openModal(<SaveHistoryModal activeDraft={activeDraft}/>)),
  closeModal: () => dispatch(closeModal()),

});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDiff);
