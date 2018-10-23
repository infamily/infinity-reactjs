import React, { Component } from 'react';
import { FormControl, Button, Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
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
          <FormattedMessage {...messages.putData}>
            {msg => (
              <FormControl
                id="formControlsText"
                className="data_field__field"
                type="text"
                componentClass="textarea"
                name="text"
                label="Data"
                value={text}
                onChange={this.handleChange}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
          <Button onClick={this.send}>
            <FormattedMessage {...messages.send} />
          </Button>
        </Panel>
        <Button
          onClick={this.handleOpen}
          className="btn-success data_field__show"
        >
          {isOpen ? (
            <FormattedMessage {...messages.close} />
          ) : (
            <FormattedMessage {...messages.show} />
          )}{' '}
          <FormattedMessage {...messages.dataField} />
        </Button>
      </div>
    );
  }
}
