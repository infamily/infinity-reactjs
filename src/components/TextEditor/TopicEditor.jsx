import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';


class TopicEditor extends PureComponent {
  static propTypes = {
    handleValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }

  render() {
    return (
      <ReactQuill
        className="text_editor"
        value={this.props.value}
        onChange={this.props.handleValue}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default TopicEditor;
