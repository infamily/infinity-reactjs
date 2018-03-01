
import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as services from './services';
import store_home from '../../services/store_home';
import configs from 'configs';
import { badgeStyle } from './helpers';

class TopicSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: [],
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

  expand = async (topic, fromId) => {
    const id = topic.id;
    const hasInState = this.state[id];
     
    if (!hasInState) {
      await this.setData(id, fromId);
      return;
    }
    
    this.setState(prevState => ({
      [id + 'open']: !prevState[id + 'open'],
      [id + 'loading']: false,
    }));
  }
  
  setData = async (id, fromId) => {
    this.setState({ [id + 'loading']: true })
    
    const children = await services.getChildren(id);
    const filter = (arr) => arr.filter(item => item.id !== fromId);

    this.setState({
      [id]: filter(children),
      [id + 'open']: true,
      [id + 'loading']: false,
    });
  }

  render() {
    const { draftStyle, EditTopic, topic } = this.props;
    
    const BadgePoint = ({ topic, fromId }) => {
      const loading = this.state[topic.id + 'loading'] ? ' point_pulse' : '';
      const { children } = topic;
      
      if (children.length) {
        return (
          <Badge 
            onClick={() => this.expand(topic, fromId)} 
            className={"topic_section__expand" + loading} 
            style={badgeStyle(topic)}>
            {' '} 
          </Badge>
        );
      } else {
        return (
          <Badge className="topic_section__badge" style={badgeStyle(topic)}>
          {' '}
          </Badge>
        );
      }
    }

    const TopicLine = ({ topic, fromId }) => {
      const children = this.state[topic.id];
      const isExpanded = this.state[topic.id + 'open'] && children;

      return (
        <div>
          <EditTopic owner={topic.owner.username} id={topic.id} />
          <h2>
            <BadgePoint topic={topic} fromId={fromId} />
            <Link to={configs.linkBase() + '/topic/' + topic.id} onClick={this.saveScroll} className="topics__item-title" data-id={topic.id}>
              {' ' + topic.title}
            </Link>
          </h2>

          <div className="topic_list__step">
            {isExpanded && children.map(item => (<TopicLine topic={item} key={'_' + item.id} fromId={topic.id} />))}
          </div>  
        </div>
      )
    };
    
    return (
      <section className={"topics__item " + draftStyle(topic)}>
        <TopicLine topic={topic} />
      </section>
    );
  }
}

export default TopicSection;
