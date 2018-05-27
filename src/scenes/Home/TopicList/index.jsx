import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from 'scenes/Home/messages';
import TopicSection from './TopicSection';
import Grid from './Grid/ComplexGrid';
// import Grid from './Grid/VirtGrid';
// import Grid from './Grid';
// import Grid from './GridTemplate';
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
        <div className="full_height">
          <Grid>{elements}</Grid>
        </div>
      );
    return <div>{elements}</div>;
  }
}

export default TopicList;
