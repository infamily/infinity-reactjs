import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopicSection from './TopicSection';
import './TopicList.css';

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.topics
    };
  }

  static propTypes = {
    topics: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.topics !== nextProps.topics) {
      this.setState({
        topics: nextProps.topics
      });
    }
  }

  render() {
    const { topics } = this.state;
    const { view } = this.props;

    const gridView = view === 'grid' && 'topics__list--grid';
    return (
      <div className={gridView}>
        {topics.map(
          topic =>
            topic && <TopicSection key={topic.id} topic={topic} view={view} />
        )}
      </div>
    );
  }
}

export default Topics;
