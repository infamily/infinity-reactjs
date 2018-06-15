import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import PreviewProgressBar from 'components/TopicProgressBar/PreviewProgressBar';
import Loading from 'components/Loading/LoadingElements';
import configs from 'configs';
import ShowCaseTopicBody from './ShowCaseTopicBody';
import { getCategories } from './helpers';
import topicService from './services/topics';
import messages from './messages';
import './ShowCaseTopic.css';

const initalMeta = {
  comments: [],
  parents: [],
  children: [],
  categories: []
};

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
      ...initalMeta
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired,
    server: PropTypes.string,
    user: PropTypes.object,
    close: PropTypes.func // tab mode
  };

  static defaultProps = {
    close: null,
    user: null,
    server: null
  };

  async componentWillMount() {
    const { id } = this.props.match.params;
    await this.loadTopicData(id);
  }

  async componentWillReceiveProps(nextProps) {
    const getId = props => props.match.params.id;
    // check if new topic is provided
    const solve = getId(this.props) !== getId(nextProps);

    if (solve) await this.loadTopicData(getId(nextProps));
  }

  loadTopicData = async id => {
    const { state } = this.props.location;
    const topicByLocation = state && state.topic;
    const topic = topicByLocation || (await topicService.getTopic(id));

    if (!topic) {
      this.props.history.push('/404');
      return;
    }

    this.setState({
      topic,
      ...initalMeta
    });

    const categories = getCategories(topic);

    this.setState({
      topic,
      categories
    });
  };

  handleEditSection = () => {
    this.setState(prevState => ({
      addChildSection: !prevState.addChildSection,
      showChildSection: true
    }));
  };

  render() {
    const { close, user, server, history } = this.props;
    const { topic, parents, children, categories } = this.state;

    if (!topic.id || !server) return <Loading />;

    const meta = {
      title: topic.title,
      description: topic.body,
      meta: {
        charset: 'utf-8'
      }
    };

    const HomeButton = () => {
      const TextButton = () => (
        <span>
          &#10094; <FormattedMessage {...messages.homeButton} />
        </span>
      );
      return close ? (
        <div onClick={close} className="nav__back">
          <TextButton />
        </div>
      ) : (
        <NavLink to={configs.linkBase()} className="nav__back">
          <TextButton />
        </NavLink>
      );
    };

    return (
      <DocumentMeta {...meta}>
        <div className="show_case__box">
          <div className="show_case__content">
            <HomeButton />
            <ShowCaseTopicBody
              topic={topic}
              history={history}
              parents={parents}
              categories={categories}
              user={user}
              updateTopic={this.updateTopic}
            >
              {children}
            </ShowCaseTopicBody>
            <PreviewProgressBar topic={topic} />
            <br />
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

export default Topic;
