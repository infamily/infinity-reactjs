import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    return (
      <div className="topics__list">
      {
       this.state.topics.map(topic => (
          <section className="topics__item" key={topic.id}>
            <Link to={'/topic/' + topic.id} className="topics__item-title" data-id={topic.id}>
              <h2>{topic.title}</h2>
            </Link>
          </section>
        ))
      }
      </div>
    );
  }
}

export default Topics;
