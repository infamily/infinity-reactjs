import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import debounce from 'lodash/debounce';
import { intlShape, injectIntl } from 'react-intl';
import messages from './messages';
import './TextEditor.css';

class StatefulEditor extends Component {
  static propTypes = {
    handleValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    intl: intlShape.isRequired
  };

  state = {
    value: RichTextEditor.createValueFromString(this.props.value, 'markdown') // RichTextEditor.createEmptyValue()
  };

  onChange = value => {
    this.setState({ value });
    this.debounceTextValue(value);
  };

  debounceTextValue = debounce(value => {
    this.props.handleValue(value);
  }, 1000);

  render() {
    const { intl } = this.props;
    const toolbarConfig = {
      display: [
        'INLINE_STYLE_BUTTONS',
        'BLOCK_TYPE_BUTTONS',
        'LINK_BUTTONS',
        'BLOCK_TYPE_DROPDOWN'
      ],
      INLINE_STYLE_BUTTONS: [
        {
          label: intl.formatMessage({ ...messages.bold }),
          style: 'BOLD',
          className: 'custom-css-class'
        },
        { label: intl.formatMessage({ ...messages.italic }), style: 'ITALIC' },
        {
          label: intl.formatMessage({ ...messages.underline }),
          style: 'UNDERLINE',
          className: 'text_editor__disabled'
        }
      ],
      BLOCK_TYPE_DROPDOWN: [
        {
          label: intl.formatMessage({ ...messages.normal }),
          style: 'unstyled'
        },
        {
          label: intl.formatMessage({ ...messages.heading1 }),
          style: 'header-one'
        },
        {
          label: intl.formatMessage({ ...messages.heading2 }),
          style: 'header-two'
        },
        {
          label: intl.formatMessage({ ...messages.heading3 }),
          style: 'header-three'
        }
      ],
      BLOCK_TYPE_BUTTONS: [
        {
          label: intl.formatMessage({ ...messages.ul }),
          style: 'unordered-list-item'
        },
        {
          label: intl.formatMessage({ ...messages.ol }),
          style: 'ordered-list-item'
        }
      ]
    };
    return (
      <RichTextEditor
        className="text_editor"
        toolbarClassName="text_editor__toolbar"
        toolbarConfig={toolbarConfig}
        value={this.state.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default injectIntl(StatefulEditor);
