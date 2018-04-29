import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import './comment_form.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || '',
      editing: Boolean(props.id)
    };
  }

  static propTypes = {
    edit: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    clearComment: PropTypes.func.isRequired,
    persistComment: PropTypes.func.isRequired,
    persistedComment: PropTypes.object.isRequired,
    topic_id: PropTypes.number.isRequired,
    text: PropTypes.string,
    user: PropTypes.object
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
    this.props.text && this.refs.field.focus();
  }

  persistComment = () => {
    const { topic_id, persistComment } = this.props;
    const { text } = this.state;

    persistComment({ id: topic_id, body: text });
  };

  checkPersisted() {
    const { persistedComment, topic_id } = this.props;

    if (persistedComment.id === topic_id) {
      this.setState({ text: persistedComment.body });
    }
  }

  submitComment = e => {
    e.preventDefault();
    const { editing, text } = this.state;
    if (!text) return;

    editing ? this.props.edit(text) : this.props.create(text);

    this.props.clearComment();
    this.setState({ text: '' });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { user, clear } = this.props;
    const { text, editing } = this.state;

    const Buttons = () => {
      if (!user)
        return (
          <div className="comment_form__signin">
            <p onClick={this.persistComment}>
              <Link to="/page/otp">Sign in</Link> to leave a comment.
            </p>
          </div>
        );

      return editing ? (
        <div>
          <Button type="submit">Save</Button>
          <Button onClick={clear} bsSize="xsmall" className="comment__btn">
            Cancel
          </Button>
        </div>
      ) : (
        <Button type="submit">Submit</Button>
      );
    };

    return (
      <div className="comment_form__section">
        <form onSubmit={this.submitComment}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Leave your comment</ControlLabel>
            <FormControl
              componentClass="textarea"
              ref={ip => (this.myInp = ip)}
              className="comment__text"
              rows="4"
              name="text"
              value={text}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Buttons />
        </form>
      </div>
    );
  }
}

export default Comment;
