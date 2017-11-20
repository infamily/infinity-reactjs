import React, { Component } from 'react';
import Topics from '../topics';

import TopicService from '../../services/topic.service.js';
import LangService from '../../services/lang.service.js';
import './home.css';

const topicService = new TopicService();
const langService = new LangService();

class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: langService.current,
      page: 1,
      query: '',
      topics: []
    }

    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    const self = this;

    topicService.setTopics().then(topics => {
      self.setState({
        topics: topics
      });
    });
  }

  makeSearch = e => {
    e.preventDefault();
    const self = this;
    this.state.page = 1;
    
    topicService.search(this.state.query).then(topics => {
      self.setState({
        topics: topics
      });
    });
  }

  changePage(num) {
    const self = this;
    const next = this.state.page + num;
    if(next > 0) {
      this.setState({ page: next });
      topicService.getPage(next).then(topics => {
        self.setState({
          topics: topics
        });
      });
      window.scroll(0, 0);
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const Pagination = () =>
    <div className="paginator">
      <a className="paginator__btn paginator__right" onClick={() => this.changePage(-1)}>&#10094;</a>
      <span className="paginator__page">{this.state.page}</span>
      <a className="paginator__btn paginator__left" onClick={() => this.changePage(1)}>&#10095;</a>
    </div>;

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
            <Pagination />
          </div>
        </article>
      </div>
    );
  }
}

export default Home;
