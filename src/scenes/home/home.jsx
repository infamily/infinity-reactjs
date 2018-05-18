import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import MenuBar from 'scenes/MenuBar';
import Loading from 'components/Loading';
import LoadingElements from 'components/Loading/LoadingElements';
import topicService from 'services/topic.service';
import store_home from './services/store_home';
import Topics from './TopicList';
import HomeConfigPanel from './HomeConfigPanel';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      page: 1,
      topics: [],
      last_pack: []
    };
  }

  static propTypes = {
    user: PropTypes.object,
    server: PropTypes.string,
    setUpdateTopicList: PropTypes.func.isRequired,
    shouldUpdateTopicList: PropTypes.bool.isRequired,
    changeHomeParams: PropTypes.func.isRequired,
    homeParams: PropTypes.object.isRequired
  };

  static defaultProps = {
    user: null,
    server: null
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

  updateListState = async () => {
    const { page } = this.state;
    const { flag, topicSource } = this.props.homeParams;
    const { fromPage, topics } = topicService;
    let topicData = { results: topics, count: null };

    if (fromPage !== page && !topics.length) {
      this.setLoading(true);
      topicData = await topicService.getTopics(flag, topicSource);
    }

    this.updateHomeTopics(topicData);
    this.setState({
      loading: false
    });
  };

  loadMore = async () => {
    const { topics, count, page } = this.state;
    const { flag, topicSource } = this.props.homeParams;
    const next = page + 1;

    if (!topics) return;
    if (count === topics.length) return;

    const newTopics = await topicService.getPage(next, flag, topicSource);
    const main_pack = topics.concat(newTopics);
    topicService.topics = main_pack; // pile up topics

    this.setState({
      topics: main_pack,
      page: next
    });
  };

  hasMore = () => {
    const { count, topics } = this.state;
    return topics && topics.length < count;
  };

  updateHomeTopics = data => {
    this.setState({
      topics: data.results,
      count: data.count,
      page: 1
    });
  };

  setLoading = bool => {
    this.setState({ loading: bool });
  };

  render() {
    const { user, server } = this.props;
    const { view } = this.props.homeParams;
    const { topics, loading } = this.state;
    const hasMore = this.hasMore();

    if (topics === null || !server) return <Loading />;
    const fullStyle = view === 'grid' && ' main--full';

    return (
      <div className={`main ${fullStyle}`}>
        <HomeConfigPanel
          user={user}
          updateHomeTopics={this.updateHomeTopics}
          setLoading={this.setLoading}
        />
        <div className="topics__content">
          {loading ? (
            <Loading />
          ) : (
            <InfiniteScroll
              pageStart={1}
              loadMore={this.loadMore}
              hasMore={hasMore}
              loader={<LoadingElements key={0} />}
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
