import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap'
import {addAdvert} from './store';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class CreateAdvert extends Component {
  constructor() {
    super()
    this.state = {title: '', description: ''};
  }
  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }
  handleFormSubmit(event) {
    console.log('sefsef')
    event.preventDefault()
    this.props.dispatch(addAdvert(this.state.title, this.state.description))
  }
  render() {
    return (
      <div className="well">
        <div className="CreateAdvert">
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Title"
              value={this.state.title}
              onChange={this.handleTitleChange.bind(this)}
            />
            <FormGroup controlId="formControlsTextarea" >
              <ControlLabel>Description</ControlLabel>
              <FormControl componentClass="textarea"
                value={this.state.description}
                onChange={this.handleDescriptionChange.bind(this)}/>
            </FormGroup>
            <Button type="submit">
              Submit
            </Button>
          </form>
          <Link to="/userpanel">Go Back</Link>
        </div>
      </div>
    );
  }
}

export default connect()(CreateAdvert);
