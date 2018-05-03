import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import MenuBar from 'scenes/MenuBar';
import Flag from 'components/FlagToggle';
import Header from 'components/Header';
import Loading from 'components/Loading';
import topicService from 'services/topic.service';
import langService from 'services/lang.service';
import Topics from './TopicList';
import TopicViewToggle from './TopicViewToggle';
import store_home from './services/store_home';
import './Home.css';

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
      view: 'grid', // (title/grid)
      topics: null,
      last_pack: [],
      loading: false
    };
  }

  static propTypes = {
    user: PropTypes.object,
    setUpdateTopicList: PropTypes.func.isRequired,
    shouldUpdateTopicList: PropTypes.bool.isRequired
  };

  async componentWillMount() {
    await this.updateListState();
  }

  componentDidMount() {
    const scrollTo = store_home.home_scroll;
    if (scrollTo) window.scrollTo(0, scrollTo);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateTopicList) {
      this.props.setUpdateTopicList(false);

      // clear state to get new topics
      topicService.resetState();
      await this.updateListState();
    }
  }

  hasMore = () => {
    const { last_pack } = this.state;
    return last_pack.length >= 25;
  };

  loadMore = () => {
    const { page, topics, flag, last_pack, topicView } = this.state;
    const self = this;
    const next = page + 1;

    if (last_pack < 25) return;

    store_home.home_page = next;

    topicService.getPage(next, flag, topicView).then(newTopics => {
      const main_pack = topics.concat(newTopics);

      topicService.topics = main_pack; // pile up topics
      self.setState({
        topics: main_pack,
        last_pack: topics,
        page: next
      });
    });
  };

  onChangeTopicView = async topicView => {
    const { flag } = this.state;
    this.setState({
      loading: true
    });
    try {
      const topics = await topicService.getTopics(flag, topicView);

      this.setState({
        topicView,
        topics,
        last_pack: topics,
        page: 1
      });
    } catch (error) {
      console.log(error);
    }
    this.setState({
      loading: false
    });
  };

  setFlag = key => {
    const self = this;
    const { flag, topicView } = this.state;

    store_home.flag = key;

    flag !== key &&
      topicService.getTopics(key, topicView).then(topics => {
        self.setState({
          flag: key,
          topics
        });
      });
  };

  makeSearch = async e => {
    e.preventDefault();
    const { query, flag, topicView } = this.state;
    try {
      const topics = await topicService.search(query, flag, topicView);
      this.setState({
        topics,
        last_pack: topics,
        page: 1
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateListState = async () => {
    const { page, flag, topicView } = this.state;
    let { fromPage, topics } = topicService;

    if (fromPage !== page && !topics.length) {
      this.setState({ loading: true });
      topics = await topicService.getTopics(flag, topicView);
    }

    this.setState({
      topics,
      last_pack: topics,
      loading: false
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleTopicView = () => {
    const { view } = this.state;
    const newView = view === 'title' ? 'grid' : 'title';
    this.setState({ view: newView });
  };

  render() {
    const { title, button } = this.state.content;
    const { flag, topics, topicView, loading, view } = this.state;
    const { user } = this.props;
    const hasMore = this.hasMore();
    const isVisible = hasMore && 'home--hidden';

    if (topics === null) return <Loading />;

    return (
      <div className="main">
        <Header user={user} title={title} />
        <form onSubmit={this.makeSearch}>
          <FormGroup>
            <InputGroup>
              <Flag setFlag={this.setFlag} flag={flag} />
              <FormControl
                type="search"
                name="query"
                value={this.state.query}
                onChange={this.handleChange}
              />
              <InputGroup.Button>
                <Button type="submit">{button}</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
        <TopicViewToggle
          onChangeTopicView={this.onChangeTopicView}
          handleTopicView={this.handleTopicView}
          topicView={topicView}
          view={view}
        />

        <div className="topics__content">
          {loading ? (
            <Loading />
          ) : (
            <InfiniteScroll
              pageStart={1}
              loadMore={this.loadMore}
              hasMore={hasMore}
              loader={
                <div className={isVisible} style={{ clear: 'both' }}>
                  Loading ...
                </div>
              }
            >
              <Topics topics={topics} view={view} />
            </InfiniteScroll>
          )}
        </div>
        <MenuBar page="Home" />
      </div>
    );
  }
}

export default Home;
