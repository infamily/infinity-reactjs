import React, { Component } from 'react';
import Topics from './topics';

import topicService from '../../services/topic.service.js';
import langService from '../../services/lang.service.js';
import './home.css';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: langService.current,
      content: langService.homeContent(),
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

    topicService.search(this.state.query).then(topics => {
      self.setState({
        topics: topics,
        page: 1
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
    const { title, button } = this.state.content;

    const Pagination = () =>
    <div className="paginator">
      <a className="paginator__btn paginator__right" onClick={() => this.changePage(-1)}>&#10094;</a>
      <span className="paginator__page">{this.state.page}</span>
      <a className="paginator__btn paginator__left" onClick={() => this.changePage(1)}>&#10095;</a>
    </div>;

    return (
      <div className="main">
        <article className="topics"> 
          <div className="header">
            <h1 className="topics__title en">{title}</h1>
            <form className="topics__search" onSubmit={this.makeSearch}>
              <input type="search" name="query" className="topics__search-input" value={this.state.query} onChange={this.handleChange} />
              <button className="en">{button}</button>
            </form>
          </div> 
          <div className="topics__content">
            <Topics topics={this.state.topics}/>
          </div>
          <Pagination />
        </article>
      </div>
    );
  }
}

export default Home;
