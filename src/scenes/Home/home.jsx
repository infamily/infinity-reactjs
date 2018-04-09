import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import { 
  FormGroup, 
  FormControl, 
  InputGroup,
  Button 
} from 'react-bootstrap';

import Topics from './topic_list';
import MenuBar from 'scenes/MenuBar';
import Flag from 'components/FlagToggle';
import Header from 'components/Header'; 
import Loading from 'components/Loading';
import TopicViewToggle from './TopicViewToggle';

import topicService from 'services/topic.service';
import langService from 'services/lang.service';
import store_home from './services/store_home';
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
      topicView: 1, 
      topics: null,
      last_pack: [],
      loading: false,
    }
  }

  static propTypes = {
    user: PropTypes.object,
  }; 

  async componentWillMount() {
    const { page, flag, topicView } = this.state;
    let { fromPage, topics } = topicService;

    if (fromPage !== page && !topics.length) {
      topics = await topicService.getTopics(flag, topicView);
    }

    this.setState({ topics, last_pack: topics});
  }

  componentDidMount() {
    const scrollTo = store_home.home_scroll;
    scrollTo && window.scrollTo(0, scrollTo)
  }

  makeSearch = async (e) => {
    e.preventDefault();
    const { query, flag, topicView } = this.state;
    try {
      const topics = await topicService.search(query, flag, topicView);
      this.setState({
        topics: topics,
        last_pack: topics,
        page: 1,
      }); 
    } catch (error) {
      console.log(error);
    }
  }

  hasMore = () => {
    const { last_pack } = this.state;
    return last_pack.length >= 25;
  }

  loadMore = () => {
    const { page, topics, flag, last_pack, topicView } = this.state;
    const self = this;
    const next = page + 1;
    
    if (last_pack < 25) return;

    store_home.home_page = next;

    topicService.getPage(next, flag, topicView).then(newTopics => {
      const main_pack = topics.concat(newTopics);

      topicService.topics = main_pack;
      self.setState({
        topics: main_pack,
        last_pack: topics,
        page: next,
      });
    });
  }

  setFlag = key => {
    const self = this;
    const { flag, topicView } = this.state;
    
    store_home.flag = key;

    flag !== key &&
      topicService.getTopics(key, topicView).then(topics => {
        self.setState({
          flag: key,
          topics,
        });
      }); 
  }

  onChangeTopicView = async (topicView) => {
    const { flag } = this.state;
     this.setState({
        loading: true,
      });
    try {
      const topics = await topicService.getTopics(flag, topicView);
      
      this.setState({
        topicView,
        topics: topics,
        last_pack: topics,
        page: 1,
      });
    } catch (error) {
      console.log(error);
    }
    this.setState({
      loading: false,
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { title, button } = this.state.content;
    const { flag, topics, topicView, loading } = this.state;
    const { user } = this.props;
    const hasMore = this.hasMore();
    const isVisible = hasMore && 'home--hidden';

    if (topics === null) return <Loading />;

    return (
      <div className="main">
        <Header user={user} title={title}/>
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
        <TopicViewToggle onChangeTopicView={this.onChangeTopicView} topicView={topicView} />
        <div className="topics__content">
          {loading 
            ? <Loading />
            : <InfiniteScroll
                pageStart={1}
                loadMore={this.loadMore}
                hasMore={hasMore}
                loader={<div className={isVisible}>Loading ...</div>}>
                <Topics topics={topics}/>
              </InfiniteScroll>
          }
        </div>
        <MenuBar page='Home'/>
      </div>
    );
  }
}

export default Home;
