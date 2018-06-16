import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import debounce from 'lodash/debounce';
import './TextEditor.css';

class SimpleStatefulEditor extends Component {
  static propTypes = {
    editor: PropTypes.number.isRequired,
    handleValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
  };

  static defaultProps = {
    placeholder: ''
  };

  state = {
    value: ''
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.editor !== nextProps.editor) {
      this.setState({ value: nextProps.value });
    }

    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({ value });
    this.debounceTextValue(value);
  };

  debounceTextValue = debounce(value => {
    this.props.handleValue(value);
  }, 1000);

  render() {
    return (
      <FormControl
        componentClass="textarea"
        className="text_editor"
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default SimpleStatefulEditor;
