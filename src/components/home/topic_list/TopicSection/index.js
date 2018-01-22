
import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import store_home from '../../../../store/home';
import configs from '../../../../configs';

class TopicSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: []
    }
  }

  static propTypes = {
    topic: PropTypes.object.isRequired,
    draftStyle: PropTypes.func.isRequired,
    EditTopic: PropTypes.func.isRequired,
  };

  saveScroll() {
    store_home.home_scroll = window.scrollY;
  }

  expand = async () => {
    
  }

  render() {
    const { colors } = configs;
    const { draftStyle, EditTopic, topic } = this.props;
    const badgeStyle = type => {
      return {
        backgroundColor: colors[type]
      }
    };

    return (
      <section className={"topics__item " + draftStyle(topic)}>
        <EditTopic owner={topic.owner.username} id={topic.id} />
        <h2>
        <Badge onClick={this.expand} className="home__type" style={badgeStyle(topic.type)}>
          {' '}
        </Badge>
        <Link to={'/topic/' + topic.id} onClick={this.saveScroll} className="topics__item-title" data-id={topic.id}>
          {' ' + topic.title}
        </Link>
        </h2>
      </section>
    );
  }
}

export default TopicSection;
