import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { ButtonGroup, ButtonToolbar, Button, Badge } from 'react-bootstrap';
import topicService from '../../services/topic.service.js';
import commentService from '../../services/comment.service.js';

import configs from '../../configs';
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
      type: '',
      comments: [],
      parents: [],
      comment_id: 0,  
      comment_text: '',
    }
  }

  static propTypes = { 
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  async componentWillMount() {
    const id = this.props.match.params.id;    
    await this.loadTopicData(id);
  }

  async componentWillReceiveProps(nextProps) {
    const id = props => props.match.params.id;
    const solve = id(this.props) !== id(nextProps);
    solve && await this.loadTopicData(id(nextProps));
  }

  loadTopicData = async (id) => {
    const self = this;
    const topic = await topicService.getTopic(id);

    if (!topic) {
      this.props.history.push('/404');
      return;
    }

    const comments = await topicService.getComments(id, topic.lang);
    const type = configs.flags[topic.type];
    const parents = await this.getParents(topic.parents);
    
    self.setState({
      topic,
      comments,
      parents,
      type
    });
  }

  async getParents(parents) {
    const formatted = [];

    for (let link of parents) {
      const parednt_id = link.match(/topics\/(\d+)/)[1];
      const { title, id, type } = await topicService.getTopic(parednt_id);
      formatted.push({ title, id, type });
    }

    return formatted;
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

  edit = async (text) => {
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

  remove = async (id) => {
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

  create = async (text) => {
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
    const { topic, comments, parents, type } = this.state;
    const user = this.props.user;

    const { colors } = configs;
    const badgeStyle = type => {
      return {
        backgroundColor: colors[type]
      }
    };

    const Tags = () => parents[0]
      ? <div className="topic__tag-box">
          <span>Tags: </span> <span className="topic__tags">{type}</span>
          {
            parents.map(topic => {
            return <Link to={`/topic/${topic.id}`} key={topic.title} className="topic__tags"> 
              <Badge className="topic__badge" style={badgeStyle(topic.type)}>{' '}</Badge>
              {' ' + topic.title}
            </Link>
            })
          }
        </div>
      : <span>Type: <span className="topic__tags">{type}</span></span>;

    const Topic = () => topic.title ?
      <div>
        <h1>{topic.title}</h1>
        <EditTopic owner={topic.owner} id={topic.id}/>
        <Tags />
        <br /> <br />
        
        <div>{ReactHtmlParser(mdConverter.makeHtml(topic.body))}</div> <br />
        <span>{topic.owner}</span>
        <br /><br /> 
      </div> 
      : null;

    const EditTopic = ({ owner, id }) => {
      const isOwner = user && (owner === user.username);
      
      return isOwner &&
        <Link to={'/edit/' + id + '/'} className="topic__edit"> <Button>Edit</Button></Link>;
    }
    
    const UserButtons = ({ id }) => 
      <ButtonToolbar>
        <ButtonGroup bsSize="xsmall">
          <Button onClick={() => this.startToEdit(id)}>&#9998;</Button>
          <Button onClick={() => this.remove(id)}>&#10006;</Button>
        </ButtonGroup>
      </ButtonToolbar>;
    
    const ReplyButton = ({ owner }) => 
      <ButtonGroup bsSize="xsmall">
        <Button onClick={() => this.reply(owner)}>Reply</Button>
      </ButtonGroup>;

    const Buttons = ({ id, owner }) => {
      return user && (
        user.username=== owner
          ? <UserButtons id={id} />
          : <ReplyButton owner={owner} />
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
          <NavLink to="/" className="topics__back">&#10094; Home</NavLink>

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