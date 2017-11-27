import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';

import Topics from './topics';
import Menu from '../utils/menu';
import Language from '../utils/account';

import topicService from '../../services/topic.service';
import langService from '../../services/lang.service';
import store_home from '../../store/home';
import './home.css';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: langService.current,
      content: langService.homeContent(),
      page: store_home.home_page || 1,
      query: '',
      topics: []
    }

    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { fromPage, topics } = topicService;

    if (fromPage === this.state.page && topics.length) {
      self.setState({
        topics: topics
      });
    } else {
      topicService.setTopics().then(topics => {
        self.setState({
          topics: topics
        });
      });
    }
  }

  componentDidMount() {
    const scrollTo = store_home.home_scroll;
    scrollTo && window.scrollTo(0, scrollTo)
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
    const { page, topics } = this.state;
    const next = page + num;

    // check for a next page
    if (next > page && topics.length < 25) return;
    
    if (next > 0) {
      this.setState({ page: next });
      store_home.home_page = next;

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

            <form onSubmit={this.makeSearch}>
              <FormGroup >
                <InputGroup>
                  <FormControl type="search" name="query" value={this.state.query} onChange={this.handleChange} />
                  <InputGroup.Button>
                    <Button type="submit">{button}</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>

          </div> 
          <div className="topics__content">
            <Topics topics={this.state.topics}/>
          </div>
          
          <Menu page='Home'/>
          <Language/>
          <Pagination />
        </article>
      </div>
    );
  }
}

export default Home;
