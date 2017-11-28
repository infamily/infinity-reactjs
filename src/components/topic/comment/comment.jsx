import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import commentService from '../../../services/comment.service.js';

import './comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: props.topic,
      comment_id: props.comment_id,
      text: props.text || '',
    }
  }

  static propTypes = {
    topic: PropTypes.string.isRequired,
    comment_id: PropTypes.number,
    text: PropTypes.string
  };

  submitComment = e => {
    e.preventDefault();
    const user = this.props.user;
    const owner = user.email.split('@')[0];
    console.log(owner)
    commentService.createTopic(this.state.topic, this.state.text, owner, user.token);
    // window.location.reload(false);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  } 

  render() {
    const { user } = this.props;

    if (!user) return ( 
      <div className="comment__section">
        <p><Link to="/page/otp">Sign in</Link> to leave a comment.</p>
      </div>
    );

    return (
      <div className="comment__section">
        <form onSubmit={this.submitComment}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Leave your comment</ControlLabel>
            <FormControl 
              componentClass="textarea"
              className="comment__text"
              rows="4"
              name="text" 
              value={this.state.text} 
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Comment; 