import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignInLine from 'components/SignInLine';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from 'scenes/Topic/messages';
import './CommentForm.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || '',
      editing: Boolean(props.id),
      blockchain: false
    };
  }

  static defaultProps = {
    id: null,
    text: null,
    user: null,
    intl: intlShape.isRequired
  };

  static propTypes = {
    id: PropTypes.string,
    edit: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    clearComment: PropTypes.func.isRequired,
    persistComment: PropTypes.func.isRequired,
    persistedComment: PropTypes.object.isRequired,
    topic_id: PropTypes.number.isRequired,
    text: PropTypes.string,
    user: PropTypes.object,
    intl: intlShape.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { text, id } = nextProps;
    if (text !== this.props.text) {
      this.setState({
        text: text || '',
        editing: Boolean(id)
      });
    }
  }

  componentDidMount() {
    this.checkPersisted();
    if (this.props.text) this.field.focus();
  }

  persistComment = () => {
    const { topic_id, persistComment } = this.props;
    const { text } = this.state;

    const blockchain = this.state.blockchain ? 0 : 1;

    persistComment({ id: topic_id, body: text, blockchain });
  };

  checkPersisted() {
    const { persistedComment, topic_id, blockchain } = this.props;

    if (persistedComment.id === topic_id) {
      this.setState({ text: persistedComment.body, blockchain: !!blockchain });
    }
  }

  submitComment = e => {
    e.preventDefault();
    const { editing, text } = this.state;
    if (!text) return;
    const action = editing ? 'edit' : 'create';
    const blockchain = this.state.blockchain ? 0 : 1;
    this.props[action](text, blockchain);
    this.props.clearComment();
    this.setState({ text: '' });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeBlockChain = value => {
    this.setState({
      blockchain: value
    });
  };

  render() {
    const { user, clear, intl } = this.props;
    const { text, editing, blockchain } = this.state;

    const getPlaceHolder = () =>
      intl.formatMessage({ ...messages.commentPlaceholder });

    const BlockChainButtons = () => {
      if (!user) {
        return null;
      }
      return (
        <ToggleButtonGroup
          type="radio"
          name="options"
          className="topic_view__draft"
          value={blockchain}
          onChange={this.onChangeBlockChain}
        >
          <ToggleButton value={false}>
            <FormattedMessage {...messages.onChain} />
          </ToggleButton>
          <ToggleButton value>
            <FormattedMessage {...messages.offChain} />
          </ToggleButton>
        </ToggleButtonGroup>
      );
    };

    const Buttons = () => {
      if (!user)
        return (
          <div onClick={this.persistComment}>
            <SignInLine
              text={<FormattedMessage {...messages.toLeaveComment} />}
            />
          </div>
        );

      return editing ? (
        <div>
          <Button type="submit">
            <FormattedMessage {...messages.save} />
          </Button>
          <Button onClick={clear} bsSize="xsmall" className="comment__btn">
            <FormattedMessage {...messages.cancel} />
          </Button>
        </div>
      ) : (
        <Button type="submit">
          <FormattedMessage {...messages.submit} />
        </Button>
      );
    };

    return (
      <div className="comment_form__section">
        <form onSubmit={this.submitComment}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>
              <FormattedMessage {...messages.leaveComment} />
            </ControlLabel>
            <FormControl
              componentClass="textarea"
              ref={c => {
                this.field = c;
              }}
              className="comment__text"
              placeholder={getPlaceHolder()}
              rows="4"
              name="text"
              value={text}
              onChange={this.handleChange}
            />
          </FormGroup>
          <div className="row">
            <div className="col-sm-3">
              <Buttons />
            </div>
            <div className="col-sm-4">
              <BlockChainButtons />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(CommentForm);
