import React, { Component } from 'react';
import { 
  FormGroup, 
  FormControl, 
  InputGroup,
  Button 
} from 'react-bootstrap';

import Topics from './topic_list';
import Menu from '../utils/menu';
import Language from '../utils/lang_select';
import Flag from '../utils/flag_toggle';

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
      flag: store_home.flag || 0,
      query: '',
      topics: []
    }

    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { page, flag } = this.state;
    const { fromPage, topics } = topicService;

    fromPage === page && topics.length
    ?  self.setState({ topics })
    : topicService.setTopics(flag).then(topics => {
        self.setState({ topics });
      }); 
  }

  componentDidMount() {
    const scrollTo = store_home.home_scroll;
    scrollTo && window.scrollTo(0, scrollTo)
  }

  makeSearch = e => {
    e.preventDefault();
    const { query, flag } = this.state;
    const self = this;

    topicService.search(query, flag).then(topics => {
      self.setState({
        topics: topics,
        page: 1
      });
    });
  }

  changePage(num) {
    const self = this;
    const { page, topics, flag } = this.state;
    const next = page + num;

    // is next page or previous page exist
    if (next > page && topics.length < 25) return;
    if (next < 0) return;

    this.setState({ page: next });
    store_home.home_page = next;

    topicService.getPage(next, flag).then(topics => {
      self.setState({
        topics: topics
      });
    });
    window.scroll(0, 0);
  }

  setFlag = key => {
    const self = this;
    const { flag } = this.state;
    
    store_home.flag = key;

    flag !== key &&
      topicService.setTopics(key).then(topics => {
        self.setState({
          flag: key,
          topics,
        });
      }); 
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { title, button } = this.state.content;
    const { flag } = this.state;

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
                  <Flag setFlag={this.setFlag} flag={flag}/>
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
