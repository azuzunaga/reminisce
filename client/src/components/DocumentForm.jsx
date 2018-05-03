import React from 'react';
import { Editor, EditorState, RichUtils,
  convertToRaw, convertFromRaw, getDefaultKeyBinding,
  KeyBindingUtil, Modifier } from 'draft-js';
import { connect } from 'react-redux';
import '../styles/stylingMain.css';
import '../styles/documentForm.css';
import {stateToHTML} from 'draft-js-export-html';
import ul from '../assets/ul-icon.png';
import {
  openModal,
  closeModal,
  createSave,
  fetchRevision,
  fetchProject
 } from '../actions/index';
import debounce from 'lodash/debounce';
import SaveRev from './SaveRev';
import TitleErrorModal from './TitleErrorModal';
import LeftSidebar from './LeftSidebar';
const {hasCommandModifier} = KeyBindingUtil;

const tabCharacter = "    ";

class DocumentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: this.props.document.title,
      body: '',
      revisions: this.props.revisions
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTab = (e) => this._onTab(e);
    this.handleSave = this.handleSave.bind(this);
    this.update = this.update.bind(this);
    this.makeSaveReq = this.makeSaveReq.bind(this);
    this.createSave = this.createSave.bind(this);
  }

  myKeyBindingFn(e: SyntheticKeyboardEvent): string {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return 'save';
    }
    return getDefaultKeyBinding(e);
  }

  saveTitle = debounce(() => {
    this.handleSave('title-change');
  }, 3000);

  saveContent = debounce(() => {
    this.handleSave('auto-save');
  }, 15000);

  onChange(editorState) {
    this.saveContent();
    this.setState({editorState});
  }

  componentDidMount () {
    if (Object.keys(this.props.document).length != 0) {
      let document = Object.assign({}, {entityMap: {}, data: {}}, this.props.document.body);
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(document))
      })
    } else {
      this.props.fetchRevision(this.props.projectId, this.props.documentId);
    }

    this.props.fetchProject(this.props.projectId);
  }

  componentWillReceiveProps(newProps) {
    if (Object.keys(newProps.document).length != 0) {
      let document = Object.assign({}, {entityMap: {}, data: {}}, newProps.document.body);
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(document)),
        title: newProps.document.title,
        revisions: newProps.revisions
      });
    }
  }

  componentWillUnmount() {
    this.saveContent.cancel();
    this.saveTitle.cancel();
    this.props.closeModal();
  }

  handleStyleClick(type) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, type));
  }

  handleKeyCommand(command, editorState) {
    if (command === 'save') {
      this.props.openModal(
        <SaveRev
          projectId={this.props.match.params.projectId}
          document={this.props.document}
          title={this.state.title}
          draftId={this.props.draft._id}
          body={convertToRaw(this.state.editorState.getCurrentContent())}
        />);
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onTab(e) {
    e.preventDefault();
    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    })
  }

  makeSaveReq(typeofSave) {
    let auto = typeofSave === 'auto-save' ? true : false;
    this.setState({body: this.state.editorState});
    let body = convertToRaw(this.state.editorState.getCurrentContent());
    return Object.assign({}, {
      save: {name: typeofSave,
      draftId: this.props.draft._id, isAuto: auto},
      newRevs: [{title: this.state.title,
      body: body}],
      deletedRevIds: [this.props.documentId]
    });
  }

  createSave(save) {
    this.props.createSave(save).then((payload) => {
      this.props.history.replace(`/project/${this.props.projectId}/document/${Object.keys(payload.revisions)[0]}`);
    }).catch( () => {
      this.props.openModal(<TitleErrorModal />)
      this.setState({
        editorState: this.state.body
      });
    });
  }

  handleSave(typeofSave) {
    let save = this.makeSaveReq(typeofSave);
    this.createSave(save);
  }

  handleBlockClick(type) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, type));
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      });
      this.saveTitle();
    }
  }

  render () {
    if (!this.state.editorState) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="standard-layout">
        <input input='text' onChange={this.update('title')}
          className="header doc-form" value={this.state.title}/>

        <main className='main'>
          <aside className='aside-left'>
            <LeftSidebar
              activeDraft={this.props.activeDraft}
              projectId={this.props.projectId}
              drafts={this.props.drafts}
              view='DocumentForm'
              revisions={this.state.revisions}
              projectName={this.props.projectName}
              documentId={this.props.documentId}
            />
          </aside>
          <section className='editor-main'>
          <ul className="toolbar">
            <li>
              <button className="bold" onMouseDown={(e)=> e.preventDefault()} onClick={() => this.handleStyleClick('BOLD')}>
                B
              </button>
            </li>
            <li>
            <button className="italics" onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleStyleClick('ITALIC')}>
            I
            </button>
            </li>
            <li>
              <button className="underline" onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleStyleClick('UNDERLINE')}>
                U
              </button>
            </li>

            <li>
              <button onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleBlockClick('header-one')}>
                H1
              </button>
            </li>

            <li>
              <button onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleBlockClick('header-two')}>
                H2
              </button>
            </li>

            <li>
              <button onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleBlockClick('header-three')}>
                H3
              </button>
            </li>

            <li>
              <button onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleBlockClick('header-four')}>
                H4
              </button>
            </li>
            <li>
              <button onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleBlockClick("unordered-list-item")}>
                <img className="ul" src={ul} alt="list"/>
              </button>
            </li>
          </ul>
          <div className="editor">
            <Editor editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              onTab={this.onTab}
              spellCheck={!this.spellCheck}
              keyBindingFn={this.myKeyBindingFn}
              />
          </div>
        </section>
        <aside className='aside-right'>
        <button className="save-button" onClick={() => this.props.openModal(
          <SaveRev
            projectId={this.props.match.params.projectId}
            document={this.props.document}
            title={this.state.title}
            draftId={this.props.draft._id}
            body={convertToRaw(this.state.editorState.getCurrentContent())}
          />
        )}>
          Save Document
        </button>
        </aside>
      </main>
    </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let draft = {};
  let document = {};
  let documentId = ownProps.match.params.documentId;
  if (Object.keys(state.revisions).length != 0) {
    let activeDraftArr = state.auth.projectsActiveDraft;
    let idx = activeDraftArr.findIndex(el =>
      { return el.projectId === ownProps.match.params.projectId});
      let draftId = activeDraftArr[idx].draftId;
    document = state.revisions[ownProps.match.params.documentId];
    draft = state.drafts[draftId];
  }

  let projectName;
  if (Object.keys(state.projects).length != 0) {
    projectName = state.projects[ownProps.match.params.projectId].name;
  }
  let revisions = [];
  if (draft.saveIds) {
    let save = state.saves[draft.saveIds[draft.saveIds.length - 1]];
    if (save) {
      revisions = save.revisionIds.map(id => state.revisions[id]);
    }
  }

  return {
    documentId,
    errors: state.errors,
    draft,
    document,
    projectId: ownProps.match.params.projectId,
    revisions: revisions,
    projectName: projectName,
  };
}

const mapDispatchToProps = (dispatch) => ({
  createSave: (save) => dispatch(createSave(save)),
  fetchRevision: (projectId, revisionId) => dispatch(fetchRevision(projectId, revisionId)),
  openModal: (component) => dispatch(openModal(component)),
  closeModal: () => dispatch(closeModal()),
  fetchProject: id => dispatch(fetchProject(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
