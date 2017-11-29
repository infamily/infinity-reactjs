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
  }

  static propTypes = { 
    match: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const self = this;
    const id = this.props.match.params.id;

    topicService.getTopic(id).then(topic => {
      self.setState({
        topic: topic
      });
    });

    topicService.getComments(id).then(comments => {
      self.setState({
        comments: comments
      }); 
    });
  }

  edit() {

  }

  async remove(id) {
    const { token } = this.props.user;
    const status = await commentService.deleteTopic(id, token);
    const comments = this.state.comments.filter(comment => comment.id !== id);
    status === 'success' && this.setState({
      comments: comments
    });
  }

  async create(text) {
    const { url } = this.state.topic;
    const { token } = this.props.user;
    const comment = await commentService.createTopic(url, text, token);
    this.setState(prevState => {
      return {
        comments: [comment].concat(prevState.comments)
      }
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

    const CommentButtons = ({ id }) => 
        <ButtonToolbar>
          <ButtonGroup bsSize="xsmall">
            <Button onClick={() => this.edit(id)}>&#9998;</Button>
            <Button onClick={() => this.remove(id)}>&#10006;</Button>
          </ButtonGroup>
        </ButtonToolbar>;

    const Comments = () => comments.length ?
      <div>
        <h3>Comments</h3>
        {
          comments.map(comment => {
            const { id, text, owner } = comment;
            return (
              <div key={id} className="comment__section">
                <div>{ReactHtmlParser(mdConverter.makeHtml(text))}</div>
                {
                  (user && (user.email === owner)) &&
                  <CommentButtons id={id}/>
                }
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
            <Comment
              topic={topic.url}
              create={this.create}
              comment_id={this.state.comment_id}
              text={this.state.comment_text}
            />
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