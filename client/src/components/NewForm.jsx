import React from 'react';
import { withRouter } from 'react-router-dom';

class NewForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        name: '',
        ownerId: this.props.userId || null,
        description: ''
      };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.formType === "Project") {
      const project = Object.assign({}, this.state);
      this.props.processForm(project);
    } else {
      const revision = Object.assign({}, {
        userId: this.state.userId, title: this.state.name
      });
      this.props.processForm(revision);
    }
  }

  renderErrors() {
    const input = document.getElementById("required-input");
    input.className += "error";

    return(
      <h5 className="error-message">{this.props.errors}</h5>
    );
  }

  descriptionField() {
    if (this.props.formType !== "Document") {
      return(
        <section className="new-form description">
          <label for="new-form-description">Description</label>
          <textarea
            name=""
            id="new-form-description"
            cols="30"
            rows="10"
            onChange={this.update('description')}
            placeholder={this.props.formType + " description"}
          >
          </textarea>
        </section>
        );
    } else {
      return null;
    }
  }

  render() {
    return(
      <div className="new-form-container">
        <form onSubmit={this.handleSubmit} className="new-form">
          <h3 className="new-form title">{"New " + this.props.formType}</h3>
          <input
            id="required-input"
            className="new-form name"
            type="text"
            placeholder={this.props.formType + " Title"}
            onChange={this.update('name')}
          />
          {this.renderErrors()}
          <input
            className="new-form submit {this.props.formType}"
            type="submit"
            value={"Create " + this.props.formType}
          />
          {this.descriptionField()}
        </form>
      </div>
    );
  }
}

export default withRouter(NewForm);
