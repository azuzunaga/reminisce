import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { connect } from 'react-redux';
import '../styles/documentForm.css';
import '../styles/stylingMain.css';
import {stateToHTML} from 'draft-js-export-html';
import ul from '../assets/ul-icon.png';
class DocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.focus = () => this.refs.editor.focus();
    this.state = { };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTab = (e) => this._onTab(e);
    this.handleSave = this.handleSave.bind(this);
  }

  // display() {
  //   let thing = stateToHTML(this.state.editorState.getCurrentContent());
  // }
  componentDidMount () {
    let here = "this is set up so we can insert any content we have already into the form";
    let hi = "so we can reuse this form for editing and possibly making readOnly here";
    this.setState({
      editorState: EditorState.createEmpty()
    });
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
    let stuff = "happen here set up for doing commits here";
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

export default connect(mapStateToProps)(DocumentForm);
