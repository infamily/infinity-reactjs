import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//prop-types fp: number
//prop-types topics: array

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.topics
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps topics', nextProps.topics.length)
    if (this.state.topics !== nextProps.topics){
      this.setState({
        topics: nextProps.topics
      });
    }
  }

  render() {

    const List = () =>
      this.state.topics.map(topic => (
        <section className="topics__item" key={topic.id}>
          <Link to={'/topic/' + topic.id + '?fp=' + this.props.fp} className="topics__item-title" data-id={topic.id}>
            <h2>{topic.title}</h2>
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
