import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopicSection from './TopicSection';
// import { Link } from 'react-router-dom';
// import configs from 'configs';
import './TopicList.css';

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.topics
    };
  }
  static defaultProps = {
    user: null
  };

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

    return (
      <div className="topics__list">
        {topics.map(
          topic =>
            topic && (
              <TopicSection
                key={topic.id}
                topic={topic}
                draftStyle={draftStyle}
              />
            )
        )}
      </div>
    );
  }
}

export default Topics;
