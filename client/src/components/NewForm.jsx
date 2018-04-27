import '../styles/newForm.css';
import React from 'react';
import { withRouter } from 'react-router-dom';

class NewForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        name: '',
        ownerId: this.props.userId,
        description: ''
      };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  checkIfErrors() {
    if (this.props.errors.length < 1) {
      this.props.closeModal();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === "Project") {
      const project = Object.assign({}, this.state);
      this.props.clearErrors();
      this.props.processForm(project).then(this.checkIfErrors.bind(this));
    } else {
      const save = Object.assign({}, {
        save: { name: "test", draftId: Object.keys(this.props.drafts)[0]}, newRevs: [{title:"test", body: {
          entityMap:{},
          blocks:[
            {
              key:"8shrj",
              text:"Hi",
              type:"unstyled",
              depth:0,
              inlineStyleRanges:[],
              entityRanges:[],
              data:{}
            }
          ],
          entityRanges:[],
          data:{}
        } }], deletedRevIds: []
      });
      console.log(save);
      this.props.clearErrors();
      this.props.processForm(save).then(this.checkIfErrors.bind(this));
    }
  }

  renderErrors() {
    if (!!this.props.errors) {
      let errors = this.props.errors.map((error, i) => <li key={i}>{error}</li>);
      return(
        <ul className="error-message">{errors}</ul>
      );
    }

    return null;
  }

  descriptionField() {
    if (this.props.formType !== "Document") {
      return(
        <section className="new-form description">
          <textarea
            name=""
            id="new-form-description"
            cols="30"
            rows="3"
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
          {this.descriptionField()}
          <input
            className={"new-form submit " + this.props.formType}
            type="submit"
            value={"Create " + this.props.formType}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(NewForm);
