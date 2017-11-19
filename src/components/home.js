import React, { Component } from 'react';
import Topics from './topics';

import TopicService from '../services/topic.service.js';
const topicService = new TopicService();

class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: 'english',
      query: '',
      topics: []
    }
    
    this.getTopics('');
  }

  getTopics(query) {
    const self = this;

    topicService.setTopics(query).then(topics => {
      self.setState({
        topics: topics
      });
    });
  }

  makeSearch = e => {
    e.preventDefault();
    this.getTopics(this.state.query);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="main">
        <article className="topics">
          <div className="topics__content">
            {
              this.state.search === 'english'
              ? <div className="header">
                <h1 className="topics__title en">Infinity Family</h1>
                <form className="topics__search" onSubmit={this.makeSearch}>
                  <input type="search" name="query" className="topics__search-input" value={this.state.query} onChange={this.handleChange} />
                  <button className="en">Search</button>
                </form>
              </div>
              : <div className="header">
                <h1 className="topics__title zh">无界家庭</h1>
                <form className="topics__search">
                  <input type="search" className="topics__search-input" onChange={this.handleChange} />
                  <button className="zh">Search in Chineese</button>
                </form>
              </div>
            }
            <Topics topics={this.state.topics}/>
          </div>
        </article>
      </div>
    );
  }
}

export default Home;
