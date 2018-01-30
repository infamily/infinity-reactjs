
import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as services from './services';
import store_home from '../../../../store/home';
import configs from '../../../../configs';

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
    const children = await services.getChildren(id);
    const parents = await services.getParents(topic.parents);
    const filter = (arr) => arr.filter(item => item.id !== fromId);    

    if(!this.state[id]) {
      this.setState({
        [id]: filter(children),
        [id + 'parents']: filter(parents),
      });
    }
  }

  render() {
    const { colors } = configs;
    const { draftStyle, EditTopic, topic } = this.props;
    const badgeStyle = type => {
      return {
        backgroundColor: colors[type]
      }
    };

    const TopicLine = ({ topic, fromId }) => (
      <div>
        <div className="topic_list__step">
          {this.state[topic.id + 'parents'] && this.state[topic.id + 'parents'].map(item => (<TopicLine topic={item} fromId={topic.id} key={'_' + item.id} />))}
        </div>
        {console.log(topic, 'topic')}
        <EditTopic owner={topic.owner.username} id={topic.id} />
        <h2>
          <Badge onClick={() => this.expand(topic, fromId)} className="topic_section__badge" style={badgeStyle(topic.type)}>
            {' '} 
          </Badge>
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
