import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import store_home from '../../store/home'; 
import configs from '../../configs';

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: ['', ...configs.types],
      topics: props.topics
    }
  }

  static propTypes = {
    topics: PropTypes.array.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.topics !== nextProps.topics){
      this.setState({
        topics: nextProps.topics
      });
    }
  }
 
  saveScroll() {
    store_home.home_scroll = window.scrollY; 
  }

  render() {
    const { types } = this.state;
    const colors = [
      '#CD6B7F',
      '#90B249',
      '#56BFC5',
      '#2E5B96',
      '#AF9CC9',
      '#D76B99'
    ];

    const List = () =>
      this.state.topics.map(topic => (
        <section className="topics__item" key={topic.id}>
          <Link to={'/topic/' + topic.id} onClick={this.saveScroll} className="topics__item-title" data-id={topic.id}>
            <h2>
            <Badge className="home__type" style={{ backgroundColor: colors[topic.type] }}>
              {' '}
            </Badge> {topic.title}</h2>
          </Link>
        </section>
      ));

    return (
      <div className="topics__list">
        <List />
      </div>
    );
  }
}

export default Topics;
