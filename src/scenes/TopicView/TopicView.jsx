import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Modal,
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
import FormSelect from 'components/FormSelect';
import CategorySelect from 'components/CategorySelect';
import SignInLine from 'components/SignInLine';
import topicViewService from 'services/topic_view.service';
import { FormattedMessage } from 'react-intl';
import configs from 'configs';
import 'react-select/dist/react-select.min.css';
import messages from './messages';
import PopupModal from './PopupModal';
import topicService from './services';
import './TopicView.css';

class TopicView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_types: configs.topic_types,
      flag: 0,
      id: null,

      topic_type: 1,
      topic_categories: [],
      topic_title: '',
      topic_text: '',
      topic_parents: [],
      is_draft: false,
      error: false,
      success: false,
      delete: false,
      isLoading: true,
      message: {
        title: '',
        text: ''
      }
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
    loaderElements: false
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
      id: eId,
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

    // redirect if isn't owner
    if (!topic || topic.owner.username !== user.username) {
      history.push('/new-topic');
      return {};
    }

    const topic_parents = await topicService.getParents(topic.parents);
    const topic_categories = await topicService.getCategories(topic.categories);

    return {
      topic_type: topic.type,
      topic_title: topic.title,
      topic_text: topic.body,
      is_draft: topic.is_draft,
      topic_categories,
      topic_parents
    };
  }

  formatData = () => {
    const {
      topic_type,
      topic_categories,
      topic_title,
      topic_text,
      topic_parents,
      is_draft
    } = this.state;

    const formatted = array => (array[0] ? array.map(item => item.url) : []);

    return {
      type: topic_type,
      title: topic_title,
      text: topic_text.toString('markdown'), // editor method
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
    const { topic_title } = this.state;
    const edited_id = match.params.eId;

    if (!topic_title.trim()) {
      this.showError();
      return;
    }

    const data = this.formatData();
    data.id = edited_id;

    const action = edited_id ? 'updateTopic' : 'createTopic';
    const topic = await topicViewService[action](data);

    if (topic) {
      // this.showSuccessMessage(topic);
      this.props.setUpdateTopicList(true);
      const link = `${configs.linkBase()}/split/topic/${topic.id}`;
      this.props.history.push(link);
    }
  };

  showSuccessMessage = topic => {
    const { id } = topic;
    const linkText = `${configs.getServer()}/topic/${id}/`;
    const link = `${configs.linkBase()}/split/topic/${id}`;
    const PopUpText = (
      <span onClick={this.refresh}>
        <FormattedMessage {...messages.available} />
        <Link to={link}> {linkText}</Link>
      </span>
    );

    this.setState({
      success: true,
      message: {
        title: <FormattedMessage {...messages.success} />,
        text: PopUpText
      }
    });

    this.props.clearTopic();
  };

  deleteTopic = async () => {
    const { match } = this.props;
    const edited_id = match.params.eId;
    const result = await topicViewService.deleteTopic(edited_id);

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
      is_draft,
      topic_categories,
      topic_parents
    } = this.state;

    const topic = {
      topic_type,
      topic_title,
      topic_text,
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

  goToTopic = () => {
    const { push } = this.props.history;
    const { eId } = this.props.match.params;
    const link = eId ? `/split/topic/${eId}` : '';
    push(`${configs.linkBase()}${link}`);
  };

  render() {
    const {
      topic_type,
      topic_categories,
      topic_title,
      topic_text,
      topic_parents,
      is_draft,

      flag,
      all_types,
      message,
      error,
      success,
      isLoading
    } = this.state;
    const { user, loaderElements, history } = this.props;
    const { goBack } = history;

    if (isLoading) return loaderElements ? <LoadingElements /> : <Loading />;

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

      return this.state.id ? (
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

    const DeletePopup = ({ isOpen, name }) => (
      <div>
        <Modal show={isOpen} className="topic_view__modal">
          <Modal.Header>
            <Modal.Title>
              <FormattedMessage {...messages.deleteConfirmation} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedMessage {...messages.deleteConfirmation} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.deleteTopic}>
              <FormattedMessage {...messages.delete} />
            </Button>
            <Button onClick={() => this.closeModal(name)}>
              <FormattedMessage {...messages.close} />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    const getPlaceHolder = () => (
      <FormattedMessage {...messages.textPlaceholder} />
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
              <ControlLabel>
                <FormattedMessage {...messages.topicTitleLabel} />
              </ControlLabel>
              <FormattedMessage {...messages.topicTitle}>
                {mes => (
                  <FormControl
                    id="formControlsText"
                    className="topic_view__field"
                    type="text"
                    name="topic_title"
                    label="Title"
                    value={topic_title}
                    onChange={this.handleChange}
                    placeholder={mes}
                  />
                )}
              </FormattedMessage>
              <TextEditor
                value={topic_text}
                handleValue={this.handleTopicText}
                placeholder={getPlaceHolder()}
              />
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
                  value={topic_parents}
                  loadOptions={this.loadTopics}
                  onChange={this.selectParents}
                />
              </InputGroup>
            </FormGroup>
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
        <DeletePopup isOpen={this.state.delete} name="delete" />
        <MenuBar page={<FormattedMessage {...messages.menuTitle} />} />
      </div>
    );
  }
}

export default TopicView;
