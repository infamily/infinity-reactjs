import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import topicService from '../../services/topic.service.js';
import Menu from '../utils/menu';
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
      comments: []    
    }
  }

  static propTypes = { 
    match: PropTypes.object.isRequired
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

  render() {
    const topic = this.state.topic;
    const comments = this.state.comments; 

    const Topic = () => topic.title ?
      <div>
        <h1>{topic.title}</h1>
        <div>{ReactHtmlParser(mdConverter.makeHtml(topic.body))}</div> <br />
        <span>{topic.owner}</span> <br /> <br />
      </div> 
      : null; 

    const Comments = () => comments.length ?
      <div>
        <h3>Comments</h3>
        {
          comments.map(comment => {
            return <div key={comment.id}>
              <div>{ReactHtmlParser(mdConverter.makeHtml(comment.text))}</div>
              <div className="comment__owner">
                <span>{comment.owner}</span>
              </div>
            </div>
          })
        }
      </div>
      : null;

    return (
      <div className="main">
        <div className="topics__content-item" style={{display: 'block'}}>
          <NavLink to="/" className="topics__back">&#10094; Go Back</NavLink>

          <Topic />
          <Comments />
          <Language />
          <Menu page='Menu'/>
        </div>
      </div>
    );
  }
}

export default Topic; 