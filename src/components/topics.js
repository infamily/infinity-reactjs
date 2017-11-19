import React, { Component } from 'react';

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.topics
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.topics', nextProps.topics)
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
            <a href={'#/topic/' + topic.id} className="topics__item-title" data-id={topic.id}>
              <h2>{topic.title}</h2>
            </a>
          </section>
        ))
      }
      </div>
    );
  }
}

export default Topics;
