import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import topicService from './services/topics';
import commentService from 'services/comment.service.js';

import TopicBody from './TopicBody';
import Menu from 'components/menu';
import Language from 'components/lang_select';
import Loading from 'components/Loading';
import CommentForm from './comment_form';
import Comments from './comments';

import './topic.css';

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
      comments: [],
      parents: [],
      children: [],
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
    const { match: { params } } = this.props;
    const id = params.id;
    await this.loadTopicData(id);
  }

  async componentWillReceiveProps(nextProps) {
    const id = props => props.match.params.id;
    const solve = id(this.props) !== id(nextProps);
    solve && await this.loadTopicData(id(nextProps));
  }

  loadTopicData = async (id) => {
    const self = this;
    const { match: { params } } = this.props;
    const server = params.server;
    const topic = await topicService.getTopic(id, server);

    if (!topic) {
      this.props.history.push('/404');
      return;
    }

    const comments = await topicService.getComments(id, topic.lang);
    const children = await topicService.getChildren(id, topic.lang);
    const parents = await this.getParents(topic.parents);

    self.setState({
      topic,
      comments,
      parents,
      children,
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

  startToEdit = (id) => {
    const comment = this.state.comments.find(comment => comment.id === id);
    this.setState({
      comment_id: id,
      comment_text: comment.text,
    });

    this.scrollToEdit();     
  }
  
  reply = (name) => {
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
    const { token } = this.props.user;
    const id = this.state.comment_id;
    const comment = await commentService.updateComment(id, text, token);

    const comments = this.state.comments.map(item => {
      return item.id === id ? comment : item;
    });
    
    this.setState({ 
      comments,
      comment_id: 0,
      comment_text: '',
    });
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
    const { topic, comments, parents, children } = this.state;
    const user = this.props.user;
    
    if (!topic.id) return <Loading />;

    return (
      <div className="main">
        <div className="topics__content-item" style={{display: 'block'}}>
          <NavLink to="/" className="nav__back">&#10094; Home</NavLink>

          <TopicBody 
            topic={topic}
            children={children}
            parents={parents}
            user={user}
          />
          <div ref="com_sec">
            <CommentForm
              create={this.create}
              edit={this.edit}
              clear={this.clear}
              text={this.state.comment_text}
              id={this.state.comment_id}
              topic_id={this.state.topic.id}
            />
          </div>
          <Comments 
            comments={comments}
            startToEdit={this.startToEdit}
            reply={this.reply}
            remove={this.remove}
          />
          <Language />
          <Menu page='Menu'/>
        </div>
      </div>
    );
  }
}

export default Topic; 
