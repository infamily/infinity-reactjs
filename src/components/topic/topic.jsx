import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, ButtonToolbar, Button } from 'react-bootstrap';
import topicService from '../../services/topic.service.js';
import commentService from '../../services/comment.service.js';
import Menu from '../utils/menu';
import Comment from './comment';
import Language from '../utils/lang_select';

import './topic.css';

import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
var mdConverter = new showdown.Converter();

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
      comments: [],
      comment_id: 0,  
      comment_text: '',  
    }

    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.clear = this.clear.bind(this);
  }

  static propTypes = { 
    match: PropTypes.object.isRequired,
  };

  async componentWillMount() {
    const self = this;
    const id = this.props.match.params.id;

    const topic = await topicService.getTopic(id);
    const comments = await topicService.getComments(id);
    self.setState({ 
      topic, 
      comments 
    });
  }

  scrollToEdit() {
    const com_sec = this.refs.com_sec;
    const position = com_sec.getBoundingClientRect().top;
    position < 0 && com_sec.scrollIntoView(); 
  }

  startToEdit(id) {
    const comment = this.state.comments.find(comment => comment.id === id);
    this.setState({
      comment_id: id,
      comment_text: comment.text,
    });

    this.scrollToEdit();     
  }
  
  reply(name) {
    const response = `[${name}], `
    this.setState({
      comment_text: response
    });

    this.scrollToEdit();
  }

  clear() {
    this.setState({
      comment_id: 0,
      comment_text: '',
    });
  }

  async edit(text) {
    try{ 
      const { token } = this.props.user;
      const id = this.state.comment_id;
      await commentService.updateComment(id, text, token);
  
      const comments = this.state.comments.map(comment => {
        if (comment.id === id) 
          comment.text = text; 
        return comment;
      });
      this.setState({ 
        comments,
        comment_id: 0,
        comment_text: '',
      });
    } catch(e) {
      console.error(e);
    }
  }

  async remove(id) {
    const { token } = this.props.user;
    const status = await commentService.deleteComment(id, token);
    const comments = this.state.comments.filter(comment => comment.id !== id);
    status === 'success' && this.setState({
      comments,
      comment_text: '',
      comment_id: 0,
    });
    this.clear();
  }

  async create(text) {
    const { url } = this.state.topic;
    const { token } = this.props.user;
    const comment = await commentService.createComment(url, text, token);
    const comments = [comment].concat(this.state.comments);
    this.setState({ 
      comments,
      comment_text: '',    
    });
  }

  render() {
    const topic = this.state.topic;
    const comments = this.state.comments; 
    const user = this.props.user; 

    const Topic = () => topic.title ?
      <div>
        <h1>{topic.title}</h1>
        <div>{ReactHtmlParser(mdConverter.makeHtml(topic.body))}</div> <br />
        <span>{topic.owner}</span> <br /> <br />
      </div> 
      : null;

    const UserButtons = ({ id }) => 
        <ButtonToolbar>
          <ButtonGroup bsSize="xsmall">
            <Button onClick={() => this.startToEdit(id)}>&#9998;</Button>
            <Button onClick={() => this.remove(id)}>&#10006;</Button>
          </ButtonGroup>
        </ButtonToolbar>;
    
    const ReplyButtons = ({ owner }) => 
      <ButtonToolbar>
        <ButtonGroup bsSize="xsmall">
          <Button onClick={() => this.reply(owner)}>Reply</Button>
        </ButtonGroup>
      </ButtonToolbar>;

    const Buttons = ({ id, owner }) => {
      return user && (
        user.username === owner
          ? <UserButtons id={id} />
          : <ReplyButtons owner={owner} />
      );
    }

    const Comments = () => comments.length ?
      <div>
        <h3>Comments</h3>
        {
          comments.map(comment => {
            const { id, text, owner } = comment;
            const content = ReactHtmlParser(mdConverter.makeHtml(text));
            
            return (
              <div key={id} className="comment__section">
                <div>{content}</div>
                <Buttons owner={owner} id={id}/>
                <div className="comment__owner">
                  <span>{owner}</span>
                </div>
              </div>
            );
          })
        }
      </div>
      : null;

    return (
      <div className="main">
        <div className="topics__content-item" style={{display: 'block'}}>
          <NavLink to="/" className="topics__back">&#10094; Go Back</NavLink>

          <Topic />
          {
            topic.id && 
            <div ref="com_sec">
              <Comment
                create={this.create}
                edit={this.edit}
                clear={this.clear}
                text={this.state.comment_text}
                id={this.state.comment_id}
              />
            </div>
          }
          <Comments />
          <Language />
          <Menu page='Menu'/>
        </div>
      </div>
    );
  }
}

export default Topic; 