import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import './TextEditor.css';

class StatefulEditor extends Component {
  static propTypes = {
    handleValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
  };

  state = {
    value: RichTextEditor.createValueFromString(this.props.value, 'markdown') // RichTextEditor.createEmptyValue()
  };

  onChange = value => {
    this.setState({ value });
    this.props.handleValue(value);
  };

  render() {
    return (
      <RichTextEditor
        // className="text_editor"
        value={this.state.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default StatefulEditor;
