import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Tabs,
  Panel,
  Tab,
  InputGroup,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import Select from 'react-select';
import MenuBar from 'scenes/MenuBar';
import Flag from 'components/FlagToggle';
import Loading from 'components/Loading';
import LoadingElements from 'components/Loading/LoadingElements';
import TextEditor from 'components/TextEditor/TopicEditor';
import SimpleEditor from 'components/TextEditor/SimpleEditor';
import FormSelect from 'components/FormSelect';
import CategorySelect from 'components/CategorySelect';
import SignInLine from 'components/SignInLine';
import topicViewService from 'services/topic_view.service';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import configs from 'configs';
import 'react-select/dist/react-select.min.css';
import messages from './messages';
import { validateJson } from './helpers';
import PopupModal from './PopupModal';
import DeletePopup from './PopupModal/Delete';
import topicService from './services';
import defaultDataJson from './defaultDataJson';
import './TopicView.css';

class TopicView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_types: configs.topic_types,
      flag: 0,
      editId: null,
      editor: 0,
      topic_type: 1,
      data: '',
      topic_categories: [],
      topic_title: '',
      topic_text: '',
      topic_source_title: '',
      topic_source_text: '',
      topic_parents: [],
      isDataEditorOpen: false,
      is_draft: false,
      error: false,
      success: false,
      delete: false,
      isLoading: true,
      message: { title: '', text: '' }
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    persistedTopic: PropTypes.object.isRequired,
    persistTopic: PropTypes.func.isRequired,
    loaderElements: PropTypes.bool,
    clearTopic: PropTypes.func.isRequired,
    setUpdateTopicList: PropTypes.func.isRequired,
    user: PropTypes.object,
    parent: PropTypes.number
  };

  static defaultProps = {
    loaderElements: false,
    intl: intlShape.isRequired
  };

  async componentWillMount() {
    const { user, match, persistedTopic, parent } = this.props;
    const { eId, p } = match.params; // provide id to get topic or parent data
    const parentId = p || parent;
    this.setLoading(true);

    const editedData = user && eId ? await this.getTopicData(eId) : {};
    const parentData = parentId ? await this.setParent(parentId) : {};

    this.setState({
      isLoading: false,
      editId: eId,
      ...persistedTopic,
      ...editedData,
      ...parentData
    });
  }

  setLoading = bool => {
    this.setState({ isLoading: bool });
  };

  async setParent(id) {
    const parent = await topicService.addParent(id);
    const type = parent.type + 1;
    const all = this.state.all_types.length;
    const childType = type < all ? type : parent.type;

    return {
      topic_parents: [parent],
      topic_type: childType
    };
  }

  async getTopicData(id) {
    const { user, history } = this.props;
    const topic = await topicService.getTopic(id);
    const topicSource = await topicService.getTopicSource(id);

    // redirect if isn't owner
    if (!topic || topic.owner.username !== user.username) {
      history.push('/new-topic');
      return {};
    }

    const topic_parents = await topicService.getParents(topic.parents);
    const topic_categories = await topicService.getCategories(topic.categories);

    return {
      data: topic.data,
      topic_type: topic.type,
      topic_title: topic.title,
      topic_text: topic.body,
      topic_source_title: topicSource.title,
      topic_source_text: topicSource.body,
      is_draft: topic.is_draft,
      topic_categories,
      topic_parents
    };
  }

  formatData = isSourceEditor => {
    const {
      topic_type,
      topic_categories,
      topic_title,
      topic_text,
      data,
      topic_source_title,
      topic_source_text,
      topic_parents,
      is_draft
    } = this.state;

    const formatted = array => (array[0] ? array.map(item => item.url) : []);

    const title = isSourceEditor ? topic_source_title : topic_title;
    const text = isSourceEditor ? topic_source_text : topic_text;

    return {
      type: topic_type,
      title,
      text,
      showcase_data: data,
      parents: formatted(topic_parents),
      categories: formatted(topic_categories),
      is_draft
    };
  };

  showError = () => {
    this.setState({
      error: true,
      message: {
        title: <FormattedMessage {...messages.submitError} />,
        text: <FormattedMessage {...messages.submitErrorText} />
      }
    });
  };

  showShowCaseError = () => {
    this.setState({
      error: true,
      message: {
        title: <FormattedMessage {...messages.submitError} />,
        text: <FormattedMessage {...messages.showCaseError} />
      }
    });
  };

  setFlag = key => {
    const { flag } = this.state;
    if (flag !== key) this.setState({ flag: key });
  };

  loadTopics = async (input, callback) => {
    const { flag } = this.state;
    const { results } = await topicViewService.search(input, flag);
    const options = results.map(topic => {
      const { title, url } = topic;
      return { label: title, value: title, url };
    });

    callback(null, {
      options
    });
  };

  submitTopic = async e => {
    e.preventDefault();
    const { match } = this.props;
    const { topic_title, topic_source_title, editor, data } = this.state;
    const editingTopicId = match.params.eId;
    const isSourceEditor = editor === 1;

    if (!isSourceEditor && !topic_title.trim()) {
      this.showError();
      return;
    }

    if (isSourceEditor && !topic_source_title.trim()) {
      this.showError();
      return;
    }

    if (data && !validateJson(data)) {
      this.showShowCaseError();
      return;
    }

    const formattedData = this.formatData(isSourceEditor);
    formattedData.id = editingTopicId;

    const action = editingTopicId ? 'updateTopic' : 'createTopic';
    const actionSource = isSourceEditor ? `${action}Source` : action;
    const topic = await topicViewService[actionSource](formattedData);

    if (topic) {
      this.props.setUpdateTopicList(true);
      const link = `${configs.linkBase()}/split/topic/${topic.id}`;
      this.props.history.push(link);
    }
  };

  deleteTopic = async () => {
    const { match } = this.props;
    const editingTopicId = match.params.eId;
    const result = await topicViewService.deleteTopic(editingTopicId);

    if (result === 'success') {
      this.props.setUpdateTopicList(true);
      this.props.history.push(configs.linkBase());
    }
  };

  refresh = () => {
    window.location.reload(false);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectCategory = item => {
    if (item) this.setState({ topic_categories: item });
  };

  selectParents = items => {
    this.setState({
      topic_parents: items
    });
  };

  showPopUp = state => {
    this.setState({
      [state]: true
    });
  };

  closeModal = state => {
    this.setState({
      [state]: false,
      message: {
        title: '',
        text: ''
      }
    });

    // update topics = true
    if (state === 'success') window.location.replace('/');
  };

  persistTopic = () => {
    const {
      topic_type,
      topic_title,
      topic_text,
      topic_source_title,
      topic_source_text,
      is_draft,
      topic_categories,
      topic_parents
    } = this.state;

    const topic = {
      topic_type,
      topic_title,
      topic_text,
      topic_source_title,
      topic_source_text,
      is_draft,
      topic_categories,
      topic_parents
    };

    this.props.persistTopic(topic);
  };

  onChangeDraft = value => {
    this.setState({
      is_draft: value
    });
  };

  handleTopicText = value => {
    this.setState({
      topic_text: value
    });
  };

  handleTopicSourceText = value => {
    this.setState({
      topic_source_text: value
    });
  };

  goToTopic = () => {
    const { push } = this.props.history;
    const { eId } = this.props.match.params;
    const link = eId ? `/split/topic/${eId}` : '';
    push(`${configs.linkBase()}${link}`);
  };

  handleEditor = key => {
    this.setState({ editor: key });
  };

  openDataEditor = () => {
    this.setState(prevState => ({
      isDataEditorOpen: !prevState.isDataEditorOpen
    }));
  };

  onChangeDataEditor = value => {
    this.setState({ data: value });
  };

  render() {
    const {
      topic_type,
      topic_categories,
      topic_text,
      topic_source_text,
      topic_parents,
      is_draft,
      isDataEditorOpen,
      data,
      editor,
      flag,
      all_types,
      message,
      error,
      success,
      isLoading
    } = this.state;
    const { user, loaderElements, history, intl } = this.props;
    const { goBack } = history;

    if (isLoading) return loaderElements ? <LoadingElements /> : <Loading />;
    console.clear();
    console.warn(this.state, 'this.state');
    const Buttons = () => {
      if (!user)
        return (
          <div onClick={this.persistTopic}>
            <SignInLine text={<FormattedMessage {...messages.toPost} />} />
          </div>
        );

      const BackButton = ({ action, ...rest }) => (
        <Button onClick={action} {...rest}>
          &#10094; <FormattedMessage {...messages.back} />
        </Button>
      );

      return this.state.editId ? (
        <div>
          <BackButton action={this.goToTopic} className="topic_view__back" />
          <Button type="submit">
            {' '}
            &#9873; <FormattedMessage {...messages.save} />
          </Button>
          <Button
            className="topic_view__btn"
            onClick={() => this.showPopUp('delete')}
          >
            &#10006; <FormattedMessage {...messages.delete} />
          </Button>
        </div>
      ) : (
        <div>
          <BackButton action={goBack} className="topic_view__back" />
          <Button type="submit">
            &#9873; <FormattedMessage {...messages.create} />
          </Button>
        </div>
      );
    };

    const getPlaceHolder = () =>
      intl.formatMessage({ ...messages.textPlaceholder });

    const TopicTitleInput = name => (
      <FormattedMessage {...messages.topicTitleLabel}>
        {mes => (
          <FormControl
            id="formControlsText"
            className="topic_view__field"
            type="text"
            name={name}
            label={<FormattedMessage {...messages.topicTitleLabel} />}
            value={this.state[name]}
            onChange={this.handleChange}
            placeholder={mes}
          />
        )}
      </FormattedMessage>
    );

    const EditorHint = ({ hintMessages }) => (
      <p className="topic_view__editor_hint">
        &#8505; <FormattedMessage {...hintMessages} />
      </p>
    );

    return (
      <div className="main">
        <div className="topic_view__container">
          <form onSubmit={this.submitTopic}>
            <FormSelect
              name="topic_type"
              label={<FormattedMessage {...messages.typeLabel} />}
              action={this.handleChange}
              value={topic_type}
            >
              {all_types.map((item, i) => (
                <option value={i} key={item}>
                  {item}
                </option>
              ))}
            </FormSelect>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>
                <FormattedMessage {...messages.categoryLabel} />
              </ControlLabel>
              <CategorySelect
                value={topic_categories}
                action={this.selectCategory}
              />
            </FormGroup>
            <FormGroup>
              <Tabs
                activeKey={this.state.editor}
                onSelect={this.handleEditor}
                id="controlled-tab-example"
              >
                <Tab
                  eventKey={0}
                  title={intl.formatMessage({
                    ...messages.visualEditorTab
                  })}
                >
                  <EditorHint hintMessages={messages.visualEditorHint} />
                  {TopicTitleInput('topic_title')}
                  <TextEditor
                    value={topic_text}
                    handleValue={this.handleTopicText}
                    placeholder={getPlaceHolder()}
                    editor={editor}
                  />
                </Tab>
                <Tab
                  eventKey={1}
                  title={intl.formatMessage({
                    ...messages.sourceEditorTab
                  })}
                >
                  <EditorHint hintMessages={messages.sourceEditorHint} />
                  {TopicTitleInput('topic_source_title')}
                  <SimpleEditor
                    value={topic_source_text}
                    handleValue={this.handleTopicSourceText}
                    placeholder={getPlaceHolder()}
                    editor={editor}
                  />
                </Tab>
              </Tabs>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>
                <FormattedMessage {...messages.parents} />
              </ControlLabel>
              <InputGroup>
                <Flag setFlag={this.setFlag} flag={flag} dropup />
                <Select.Async
                  className="topic_view__select"
                  name="topic_categories"
                  resetValue=""
                  multi
                  placeholder={<FormattedMessage {...messages.select} />}
                  noResultsText={
                    <FormattedMessage id="infinity.common.Select.noResultsText" />
                  }
                  searchPromptText={
                    <FormattedMessage id="infinity.common.Select.searchPromptText" />
                  }
                  loadingPlaceholder={
                    <FormattedMessage id="infinity.common.Select.loadingPlaceholder" />
                  }
                  value={topic_parents}
                  loadOptions={this.loadTopics}
                  onChange={this.selectParents}
                />
              </InputGroup>
            </FormGroup>
            <div
              onClick={this.openDataEditor}
              className="topic_view__showcase_handler"
            >
              <FormattedMessage {...messages.showCaseData} />
            </div>
            <Panel
              id="collapsible-data-panel"
              className="topic_view__showcase_editor"
              expanded={isDataEditorOpen}
              collapsible
              defaultExpanded={false}
            >
              <Button
                className="topic_view__fill_data"
                bsSize="small"
                onClick={() => this.onChangeDataEditor(defaultDataJson)}
              >
                <FormattedMessage {...messages.fillShowCaseData} />
              </Button>
              <SimpleEditor
                value={data}
                handleValue={this.onChangeDataEditor}
                placeholder={intl.formatMessage({
                  ...messages.showCasePlaceholder
                })}
                editor={editor}
              />
            </Panel>
            <ToggleButtonGroup
              type="radio"
              name="options"
              className="topic_view__draft"
              value={is_draft}
              onChange={this.onChangeDraft}
            >
              <ToggleButton value={false}>
                <FormattedMessage {...messages.public} />
              </ToggleButton>
              <ToggleButton value>
                <FormattedMessage {...messages.draft} />
              </ToggleButton>
            </ToggleButtonGroup>
            <br />
            <br />
            <div className="topic_view__editor_msg">
              {editor ? (
                <FormattedMessage {...messages.sourceEditorMsg} />
              ) : (
                <FormattedMessage {...messages.visualEditorMsg} />
              )}
            </div>
            <Buttons />
          </form>
        </div>
        <PopupModal
          isOpen={error}
          name="error"
          message={message}
          closeModal={this.closeModal}
        />
        <PopupModal
          isOpen={success}
          name="success"
          message={message}
          closeModal={this.closeModal}
        />
        <DeletePopup
          deleteTopic={this.deleteTopic}
          closeModal={this.closeModal}
          isOpen={this.state.delete}
          name="delete"
        />
        <MenuBar page={<FormattedMessage {...messages.menuTitle} />} />
      </div>
    );
  }
}

export default injectIntl(TopicView);
