import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic_id: props.topic_id || 0,
      comment_id: props.comment_id || 0,
      text: props.text || '',
    }
  }

  static propTypes = {
    topic_id: PropTypes.number,
    comment_id: PropTypes.number,
    text: PropTypes.string
  };

  submitComment = e => {
    e.preventDefault();
    console.log(this.state)
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