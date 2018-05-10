import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import MenuBar from 'scenes/MenuBar';
import Loading from 'components/Loading';
import LoadingElements from 'components/Loading/LoadingElements';
import topicService from 'services/topic.service';
import store_home from './services/store_home';
import Topics from './TopicList';
import HomePanel from './HomePanel';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      topics: [],
      last_pack: [],
      view: 'grid' // params: line | grid
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

  updateListState = async () => {
    const { page, flag, topicView } = this.state;
    const { fromPage } = topicService;
    let { topics } = topicService;

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

  loadMore = async () => {
    const { page, topics, flag, last_pack, topicView } = this.state;
    const next = page + 1;

    if (last_pack < 25) return;

    store_home.home_page = next;

    const newTopics = await topicService.getPage(next, flag, topicView);
    const main_pack = topics.concat(newTopics);

    topicService.topics = main_pack; // pile up topics
    this.setState({
      topics: main_pack,
      last_pack: newTopics,
      page: next
    });
  };

  hasMore = () => {
    const { last_pack } = this.state;
    return last_pack && last_pack.length >= 25;
  };

  updateTopicList = topics => {
    this.setState({ topics, last_pack: topics });
  };

  render() {
    const { user } = this.state;
    const { topics, loading, view } = this.state;
    const hasMore = this.hasMore();

    if (topics === null) return <Loading />;
    const fullStyle = view === 'grid' && ' main--full';

    return (
      <div className={`main ${fullStyle}`}>
        {
          // to do: separate FormGroup and Topics components (performance)
        }
        <HomePanel user={user} updateTopicList={this.updateTopicList} />
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
