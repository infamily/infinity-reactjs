import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingElements from 'components/Loading/LoadingElements';
import messages from 'scenes/Home/messages';
import TopicSection from './TopicSection';
import Grid from './Grid/VirtualizedList';
import './TopicList.css';

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.topics
    };
  }

  static defaultProps = {
    topics: null
  };

  static propTypes = {
    topics: PropTypes.array,
    count: PropTypes.number.isRequired,
    view: PropTypes.string.isRequired,
    loadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.func.isRequired
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
    const { view, count } = this.props;
    const elements =
      topics &&
      topics.map(
        topic =>
          topic && <TopicSection key={topic.id} topic={topic} view={view} />
      );

    if (!topics || !topics.length)
      return (
        <div>
          <br />
          <p>
            <FormattedMessage {...messages.noTopics} />
          </p>
        </div>
      );

    if (view === 'grid')
      return (
        <Grid count={count} loadMore={this.props.loadMore}>
          {elements}
        </Grid>
      );

    const hasMore = this.props.hasMore();
    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={this.props.loadMore}
        hasMore={hasMore}
        loader={<LoadingElements key={0} />}
      >
        {elements}
      </InfiniteScroll>
    );
  }
}

export default TopicList;
