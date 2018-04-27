import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { connect } from 'react-redux';
import '../styles/documentForm.css';
import '../styles/stylingMain.css';
import {stateToHTML} from 'draft-js-export-html';
import ul from '../assets/ul-icon.png';
import { openModal, closeModal, createSave } from '../actions/index';
import debounce from 'lodash/debounce';
class DocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.focus = () => this.refs.editor.focus();
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTab = (e) => this._onTab(e);
    this.handleSave = this.handleSave.bind(this);
  }

  saveContent = debounce((content) => {
    console.log("hello");
  }, 1000);

  onChange(editorState) {
    this.saveContent();
    this.setState({editorState});
  }

  componentDidMount () {
    if (Object.keys(this.props.document).length !== 0) {
      let document = Object.assign({}, {entityMap: {}, data: {}}, this.props.document.body);
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(document))
      })
    } else {
      this.setState({editorState: EditorState.createEmpty()})
    }
  }

  handleStyleClick(type) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, type));
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onTab(e) {
    e.preventDefault();
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  handleSave() {
    let body = convertToRaw(this.state.editorState.getCurrentContent());
    const save = Object.assign({}, {
      save: { name: 'my-fave',
        draftId: this.props.draft._id, isAuto: false},
        newRevs: [{title: this.props.document.title,
        body: body}],
        deletedRevIds: [this.props.document._id]
    });
    this.props.createSave(save);
  }

  handleBlockClick(type) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, type));
  }

  render () {
    if (!this.state.editorState) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="standard-layout">
        <h1 className="header">Document: {this.props.document.title}</h1>
        <div className="header-content">
        <h3 className="draft-version">Draft Version: {this.props.draft.name}</h3>
        <button className="save-button" onClick={this.handleSave}>Save Document</button>
        </div>
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
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let draft = {};
  let document = {};
  let documentId = ownProps.match.params.documentId;
  if (Object.keys(state.revisions).length != 0) {
    document = state.revisions[ownProps.match.params.documentId];
    draft = Object.values(state.drafts)[0];
  }
  return {
          documentId,
          errors: state.errors,
          document,
          draft
        };
}

const mapDispatchToProps = (dispatch) => ({
  createSave: (save) => dispatch(createSave(save))
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
