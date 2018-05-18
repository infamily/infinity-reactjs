import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopicSection from './TopicSection';
import Grid from './Grid';
import './TopicList.css';

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.topics
    };
  }

  static defaultProps = {
    children: null
  };

  static propTypes = {
    topics: PropTypes.array,
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
    const elements =
      topics &&
      topics.map(
        topic =>
          topic && <TopicSection key={topic.id} topic={topic} view={view} />
      );

    if (view === 'grid') return <Grid>{elements}</Grid>;
    return <div>{elements}</div>;
  }
}

export default TopicList;
