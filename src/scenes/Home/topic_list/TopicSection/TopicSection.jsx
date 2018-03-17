
import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as services from './services';
import store_home from '../../services/store_home';
import configs from 'configs';
import { badgeStyle, getBorder } from './helpers';
import TopicLink from 'images/topic_link.jpg';

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
      const id = topic.id;
      const children = this.state[id];
      const isExpanded = this.state[id + 'open'] && children;
      const tabLink = configs.linkBase() + '/split/topic/' + id;
      const fullLink = configs.linkBase() + '/topic/' + id;
      
      return (
        <div>
          <EditTopic owner={topic.owner.username} id={id} />
          <h2 className="topic_list__title">
            <BadgePoint topic={topic} fromId={fromId} />
            <Link 
              to={tabLink} 
              onClick={this.saveScroll} className="topics__item-title" data-id={id}>
              {' ' + topic.title}
            </Link>
            <Link to={fullLink}>
              <img src={TopicLink} className="topic_section__icon" alt="infinity link" />
            </Link>
          </h2>

          <div className="topic_list__step" style={getBorder(topic)}>
            {isExpanded && children.map(item => (<TopicLine topic={item} key={'_' + item.id} fromId={id} />))}
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