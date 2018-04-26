import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { connect } from 'react-redux';
import '../styles/documentForm.css';
import '../styles/stylingMain.css';
import {stateToHTML} from 'draft-js-export-html';
import ul from '../assets/ul-icon.png';
import { fetchRevision } from '../actions/index';
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
    let found = false; //Here we would do the fetchRevision to do this we need the revision id which would be created when we create the empty document
    if (found) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(found))
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
        <h1 className="header">Document: {this.props.document.name}</h1>
        <div className="header-content">
        <h3 className="draft-version">Draft Version: {this.props.save.comment}</h3>
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

function mapStateToProps(state) {
  return { document: { name: "Chapter One" },
          save: {comment: 'Not fact checked'}};
}

const mapDispatchToProps = (dispatch) => ({
  fetchRevision: (id) => dispatch(fetchRevision(id))
});

export default connect(mapStateToProps)(DocumentForm);
