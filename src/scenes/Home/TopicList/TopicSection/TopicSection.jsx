import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TopicCard from './TopicCard';
import TopicEditButton from './TopicEditButton';
import * as services from './services';
import store_home from '../../services/store_home';
import { badgeStyle, getBorder, getDraftStyle, getTopicLink } from './helpers';

class TopicSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: []
    };
  }

  static defaultProps = {
    user: null
  };

  static propTypes = {
    topic: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  saveScroll() {
    store_home.home_scroll = window.scrollY;
  }

  expand = async (topic, fromId) => {
    const id = topic.id;
    const hasInState = this.state[id];

    if (!hasInState) {
      await this.setData(id, fromId);
      return;
    }

    this.setState(prevState => ({
      [`${id}_isOpen`]: !prevState[`${id}_isOpen`],
      [`${id}_isLoading`]: false
    }));
  };

  setData = async (id, fromId) => {
    this.setState({ [`${id}_isLoading`]: true });

    const children = await services.getChildren(id);
    const filter = arr => arr.filter(item => item.id !== fromId);

    this.setState({
      [id]: filter(children),
      [`${id}_isOpen`]: true,
      [`${id}_isLoading`]: false
    });
  };

  render() {
    const { user, view, history } = this.props;
    const isLineView = view === 'line';

    const BadgePoint = ({ topic, fromId }) => {
      const loading = this.state[`${topic.id}loading`] ? ' point_pulse' : '';
      const { children } = topic;

      if (children.length) {
        return (
          <Badge
            onClick={() => this.expand(topic, fromId)}
            className={`topic_section__expand${loading}`}
            style={badgeStyle(topic)}
          >
            {' '}
          </Badge>
        );
      }
      return (
        <Badge className="topic_section__badge" style={badgeStyle(topic)}>
          {' '}
        </Badge>
      );
    };

    const TitleView = ({ topic, fromId }) => (
      <div className="topic_list__title-box">
        <BadgePoint topic={topic} fromId={fromId} />
        <Link to={getTopicLink(topic.id)} onClick={this.saveScroll}>
          <h2 className="topic_list__title">{` ${topic.title}`}</h2>
        </Link>
      </div>
    );

    const TopicLine = ({ topic, fromId }) => {
      const { id } = topic;
      const children = this.state[id];
      const isExpanded = this.state[`${id}_isOpen`] && children;
      return (
        <div className="topic_list__item">
          <TopicEditButton topic={topic} user={user} />
          {isLineView ? (
            <TitleView topic={topic} fromId={fromId} />
          ) : (
            <TopicCard topic={topic} history={history} />
          )}
          <div className="topic_list__step" style={getBorder(topic)}>
            {isExpanded &&
              children.map(item => (
                <TopicLine topic={item} key={`_${item.id}`} fromId={id} />
              ))}
          </div>
        </div>
      );
    };

    const draftStyle = getDraftStyle(this.props.topic);
    const gridStyle = !isLineView && 'topics__item--grid';
    return (
      <div className={`topics__item ${draftStyle} ${gridStyle}`}>
        <TopicLine topic={this.props.topic} />
      </div>
    );
  }
}

export default TopicSection;
