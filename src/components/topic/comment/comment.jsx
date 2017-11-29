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
      text: props.text || '',
      editing: Boolean(props.text),
    }
  }

  static propTypes = {
    edit: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    text: PropTypes.string
  };

  componentWillReceiveProps(nextProps) {
    const { text } = nextProps;
    text !== this.props.text && this.setState({
      text: text || '',
      editing: Boolean(text),
    })
  }


  submitComment = e => {
    e.preventDefault();
    const { editing, text } = this.state;
    if (!text) return;
    
    editing
    ? this.props.edit(text)
    : this.props.create(text);

    this.setState({ text: '' });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  } 

  render() {
    const { user, clear } = this.props;
    const { text, editing } = this.state;

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
              value={text} 
              onChange={this.handleChange}
            />
          </FormGroup>
          { editing ?
            <div>
              <Button type="submit" >Edit</Button>
              <Button onClick={clear} bsSize="xsmall" className="comment__btn">Cancel</Button>
            </div>
            : <Button type="submit">Submit</Button>
          }
        </form>
      </div>
    );
  }
}

export default Comment; 