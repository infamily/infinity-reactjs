import React, { Component } from 'react';
import { FormControl, Button, Panel } from 'react-bootstrap';
import './TabDataField.css';

export default class TabDataField extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      text: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  send = () => {
    console.log('DATA: ', this.state.text);
    this.setState({ text: '' });
  };

  render() {
    const { text, isOpen } = this.state;

    return (
      <div className="data_field">
        <Panel
          id="collapsible-data-panel"
          className="data_field__panel"
          expanded={isOpen}
          collapsible
          defaultExpanded={false}
        >
          <FormControl
            id="formControlsText"
            className="data_field__field"
            type="text"
            componentClass="textarea"
            name="text"
            label="Data"
            value={text}
            onChange={this.handleChange}
            placeholder="Put your data here"
          />
          <Button onClick={this.send}>Send</Button>
        </Panel>
        <Button
          onClick={this.handleOpen}
          className="btn-success data_field__show"
        >
          {isOpen ? 'Close' : 'Show'} Data Field
        </Button>
      </div>
    );
  }
}
