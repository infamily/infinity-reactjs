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

  componentDidMount() {
    const { handleValue } = this.props;
    const { value } = this.state;
    setInterval(() => console.log(value, 'value'), 1000);
  }

  onChange = value => {
    this.setState({ value });
    // this.props.handleValue(value);
  };

  render() {
    const toolbarConfig = {
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'editor__btn' },
        { label: 'Italic', style: 'ITALIC', className: 'editor__btn' },
        { label: 'Underline', style: 'UNDERLINE', className: 'editor__btn' }
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Large', style: 'header-one' },
        { label: 'Medium', style: 'header-two' },
        { label: 'Small', style: 'header-three' }
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item', className: 'editor__btn' },
        { label: 'OL', style: 'ordered-list-item', className: 'editor__btn' }
      ]
    };

    return (
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        className="text_editor editor__btn"
        value={this.state.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default StatefulEditor;
