
import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as services from './services';
import store_home from '../../services/store_home';
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
    this.setState({ [topic.id + 'loading']: true })
    const id = topic.id;
    const children = await services.getChildren(id);
    const parents = await services.getParents(id);
    const filter = (arr) => arr.filter(item => item.id !== fromId);    
    
    if(!this.state[id]) {
      this.setState({
        [id]: filter(children),
        [id + 'parents']: filter(parents),
        [topic.id + 'loading']: false,
      });
    } else {
      this.setState({
        [topic.id + 'loading']: false,
      });
    }
  }

  render() {
    const { draftStyle, EditTopic, topic } = this.props;
    
    const BadgePoint = ({ topic, fromId }) => {
      const loading = this.state[topic.id + 'loading'] ? ' point_pulse' : '';
      const { children, parents } = topic;
      
      if (children.length || parents.length) {
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

    const TopicLine = ({ topic, fromId }) => (
      <div>
        <div className="topic_list__step">
          {this.state[topic.id + 'parents'] && this.state[topic.id + 'parents'].map(item => (<TopicLine topic={item} fromId={topic.id} key={'_' + item.id} />))}
        </div>
        
        <EditTopic owner={topic.owner.username} id={topic.id} />
        <h2>
          <BadgePoint topic={topic} fromId={fromId} />
          <Link to={'/topic/' + topic.id} onClick={this.saveScroll} className="topics__item-title" data-id={topic.id}>
            {' ' + topic.title}
          </Link>
        </h2>

        <div className="topic_list__step">
          {this.state[topic.id] && this.state[topic.id].map(item => (<TopicLine topic={item} key={'_' + item.id} fromId={topic.id} />))}
        </div>  
      </div>
    );

    return (
      <section className={"topics__item " + draftStyle(topic)}>
        <TopicLine topic={topic} />
      </section>
    );
  }
}

export default TopicSection;
