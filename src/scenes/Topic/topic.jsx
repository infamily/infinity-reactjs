import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import MenuBar from 'scenes/MenuBar';
import TopicView from 'scenes/TopicView';
import Loading from 'components/Loading';
import commentService from 'services/comment.service';
import { Panel } from 'react-bootstrap';
import configs from 'configs';
import TopicBody from './TopicBody';
import CommentForm from './comment_form';
import Comments from './comments';
import { getCategories } from './helpers';
import topicService from './services/topics';
import NewButton from './NewButton';
import './topic.css';

const getChild = type_id => {
  const child_type = type_id + 1;
  const type = child_type < configs.topic_types.length ? child_type : type_id;
  return configs.topic_types[type];
};

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
      comments: [],
      parents: [],
      children: [],
      categories: [],
      comment_id: 0,
      comment_text: '',
      addChildSection: false
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
    close: PropTypes.func // tab mode
  };

  static defaultProps = {
    close: null
  };

  async componentWillMount() {
    const { id } = this.props.match.params;
    await this.loadTopicData(id);
  }

  async componentWillReceiveProps(nextProps) {
    const getId = props => props.match.params.id;
    // check if new topic is provided
    const solve = getId(this.props) !== getId(nextProps);
    solve && (await this.loadTopicData(getId(nextProps)));
  }

  loadTopicData = async id => {
    const { server } = this.props.match.params;
    const topic = await topicService.getTopic(id, server);

    if (!topic) {
      this.props.history.push('/404');
      return;
    }

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

  scrollToEdit() {
    const com_sec = this.refs.com_sec;
    const position = com_sec.getBoundingClientRect().top;
    position < 0 && com_sec.scrollIntoView();
  }

  startToEdit = id => {
    const comment = this.state.comments.find(comment => comment.id === id);
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
      addChildSection: !prevState.addChildSection
    }));
  };

  render() {
    const { close, user } = this.props;
    const {
      topic,
      comments,
      parents,
      children,
      categories,
      addChildSection
    } = this.state;

    if (!topic.id) return <Loading />;

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
          &#10094; Home
        </div>
      ) : (
        <NavLink to={configs.linkBase()} className="nav__back">
          &#10094; Home
        </NavLink>
      );

    const newButtonText = !addChildSection
      ? `+ ${getChild(topic.type)}`
      : 'Close';

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
            >
              {children}
            </TopicBody>
            <NewButton action={this.handleEditSection} title={newButtonText} />
            <div className="topic__edit_section">
              <Panel
                id="collapsible-data-panel"
                expanded={addChildSection}
                className="topic__edit_panel"
                collapsible
                defaultExpanded={false}
              >
                <TopicView parent={topic.id} />
              </Panel>
            </div>
            <div ref="com_sec">
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
            <MenuBar page="Menu" />
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

export default Topic;
