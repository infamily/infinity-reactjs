import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopicSection from './TopicSection';
import configs from 'configs';
import './topic_list.css'; 

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.topics
    }
  }

  static propTypes = {
    topics: PropTypes.array.isRequired,
    user: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.topics !== nextProps.topics) {
      this.setState({
        topics: nextProps.topics
      });
    }
  }

  render() {
    const { user } = this.props;
    const { topics } = this.state;
    const draftStyle = topic => {
      if (!topic.is_draft) return '';
      if (!user) return 'topic_list__hide';

      const isOwner = topic.owner.username === user.username;
      return isOwner ? 'topic_list__draft' : 'topic_list__hide';
    };

    const EditTopic = ({ owner, id }) => {
      const isOwner = user && (owner === user.username);

      return isOwner
        ? <div className="topic_list__edit">
          <Link to={configs.linkBase() + "/split/edit/" + id + "/"}>
              <div className="topic_list__btn">&#9998;</div>
            </Link>
          </div> 
        : null;
    }

    return (
      <div className="topics__list">
        {topics.map(topic => topic && (
          <TopicSection
            key={topic.id}
            topic={topic}
            draftStyle={draftStyle}
            EditTopic={EditTopic}
          />))}
      </div>
    );
  }
}

export default Topics;
