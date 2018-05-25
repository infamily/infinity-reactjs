import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import MenuBar from 'scenes/MenuBar';
import TopicView from 'scenes/TopicView';
import PreviewTopicBar from 'components/TopicProgressBar/PreviewTopicBar';
import Loading from 'components/Loading/LoadingElements';
import commentService from 'services/comment.service';
import { Panel } from 'react-bootstrap';
import configs from 'configs';
import TopicBody from './TopicBody';
import CommentForm from './CommentForm';
import Comments from './Comments';
import { getCategories } from './helpers';
import topicService from './services/topics';
import NewButton from './NewButton';
import messages from './messages';
import './Topic.css';

const getChild = type_id => {
  const child_type = type_id + 1;
  const type = child_type < configs.topic_types.length ? child_type : type_id;
  return configs.topic_types[type];
};

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
      ...initalMeta,
      comment_id: 0,
      comment_text: '',
      addChildSection: false, // for panel
      showChildSection: false // for first data pulling
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
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
    const topic = await topicService.getTopic(id);

    if (!topic) {
      this.props.history.push('/404');
      return;
    }

    this.setState({
      topic,
      ...initalMeta
    });

    const { lang } = topic;
    const comments = await topicService.getComments(id, lang);
    const children = await topicService.getChildren(id, lang);
    const parents = await topicService.getParents(id, lang);
    const categories = getCategories(topic);

    this.setState({
      topic,
      comments,
      parents,
      children,
      categories
    });
  };

  updateTopic = async () => {
    const { id } = this.props.match.params;
    const topic = await topicService.getTopic(id);
    this.setState({
      topic
    });
  };

  scrollToEdit() {
    const position = this.com_sec.getBoundingClientRect().top;
    if (position < 0) this.com_sec.scrollIntoView();
  }

  startToEdit = id => {
    const comment = this.state.comments.find(item => item.id === id);
    this.setState({
      comment_id: id,
      comment_text: comment.text
    });

    this.scrollToEdit();
  };

  reply = name => {
    const response = `[${name}], `;
    this.setState({
      comment_text: response
    });

    this.scrollToEdit();
  };

  clear() {
    this.setState({
      comment_id: 0,
      comment_text: ''
    });
  }

  edit = async text => {
    const id = this.state.comment_id;
    const comment = await commentService.updateComment(id, text);

    const comments = this.state.comments.map(
      item => (item.id === id ? comment : item)
    );

    this.setState({
      comments,
      comment_id: 0,
      comment_text: ''
    });
  };

  remove = async id => {
    const status = await commentService.deleteComment(id);
    const comments = this.state.comments.filter(comment => comment.id !== id);
    if (status === 'success')
      this.setState({
        comments,
        comment_text: '',
        comment_id: 0
      });
    this.clear();
  };

  create = async text => {
    const { url } = this.state.topic;
    const comment = await commentService.createComment(url, text);
    const comments = [comment].concat(this.state.comments);
    this.setState({
      comments,
      comment_text: ''
    });
  };

  handleEditSection = () => {
    this.setState(prevState => ({
      addChildSection: !prevState.addChildSection,
      showChildSection: true
    }));
  };

  render() {
    const { close, user, server } = this.props;
    const {
      topic,
      comments,
      parents,
      children,
      categories,
      addChildSection,
      showChildSection
    } = this.state;

    if (!topic.id || !server) return <Loading />;

    const meta = {
      title: topic.title,
      description: topic.body,
      meta: {
        charset: 'utf-8'
      }
    };

    const HomeButton = () =>
      close ? (
        <div onClick={close} className="nav__back">
          &#10094; <FormattedMessage {...messages.homeButton} />
        </div>
      ) : (
        <NavLink to={configs.linkBase()} className="nav__back">
          &#10094; <FormattedMessage {...messages.homeButton} />
        </NavLink>
      );

    const newButtonText = !addChildSection ? (
      getChild(topic.type)
    ) : (
      <FormattedMessage {...messages.close} />
    );
    // const newButtonText = `+ ${childText}`;
    return (
      <DocumentMeta {...meta}>
        <div className="main">
          <div className="topics__content-item" style={{ display: 'block' }}>
            <HomeButton />
            <TopicBody
              topic={topic}
              parents={parents}
              categories={categories}
              user={user}
              updateTopic={this.updateTopic}
            >
              {children}
            </TopicBody>
            <PreviewTopicBar topic={topic} />
            <br />
            <NewButton action={this.handleEditSection} title={newButtonText} />
            <div className="main__shadow_box">
              {showChildSection && (
                <Panel
                  id="collapsible-data-panel"
                  expanded={addChildSection}
                  className="topic__edit_panel"
                  collapsible
                  defaultExpanded={false}
                >
                  <TopicView parent={topic.id} loaderElements />
                </Panel>
              )}
            </div>
            <div
              ref={c => {
                this.com_sec = c;
              }}
            >
              <CommentForm
                create={this.create}
                edit={this.edit}
                clear={this.clear}
                text={this.state.comment_text}
                id={this.state.comment_id}
                topic_id={this.state.topic.id}
              />
            </div>
            <Comments
              comments={comments}
              startToEdit={this.startToEdit}
              reply={this.reply}
              remove={this.remove}
            />
            <MenuBar page={<FormattedMessage {...messages.menuTitle} />} />
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

export default Topic;
