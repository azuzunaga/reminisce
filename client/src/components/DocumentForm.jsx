import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { connect } from 'react-redux';
import '../styles/documentForm.css';

class DocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
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

  handleBlockClick(type) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }

  render () {
    return (
      <div className="document-create-container">
        <h1 className="header">Document: {this.props.document.name}</h1>
        <h2 className="draft-version">Draft Version: {this.props.save.comment}</h2>
        <ul className="toolbar">
          <li>
            <button onMouseDown={(e)=> e.preventDefault()} onClick={() => this.handleStyleClick('BOLD')}>
              Bold
            </button>
          </li>
          <li>
            <button onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleStyleClick('UNDERLINE')}>
              Underline
            </button>
          </li>

          <li>
            <button onMouseDown={(e) => e.preventDefault()} onClick={() => this.handleBlockClick("unordered-list-item")}>
              UL
            </button>
          </li>
        </ul>
        <Editor editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { document: { name: "Chapter One" },
          save: {comment: 'Not fact checked'}};
}

export default connect(mapStateToProps)(DocumentForm);
