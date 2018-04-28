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
import TextEditor from 'components/TextEditor/TopicEditor';
import FormSelect from 'components/FormSelect';
import topicViewService from 'services/topic_view.service';
import configs from 'configs';
import 'react-select/dist/react-select.min.css';
import { PopupModal } from './PopupModal';
import SelectOption from './SelectOption';
import topicService from './services';
import './TopicView.css';

class TopicView extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    persistedTopic: PropTypes.object.isRequired,
    persistTopic: PropTypes.func.isRequired,
    clearTopic: PropTypes.func.isRequired,
    setUpdateTopicList: PropTypes.func.isRequired,
    user: PropTypes.object,
    parent: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      all_types: configs.topic_types,
      all_categories: [],
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

  async componentWillMount() {
    const { user, match, persistedTopic, parent } = this.props;
    const { eId, p } = match.params; // provide id to get topic or parent data
    const parentId = p || parent;
    this.setLoading(true);

    const categories = await topicViewService.getCategories();
    const editedData = user && eId ? await this.getTopicData(eId) : {};
    const parentData = parentId ? await this.setParent(parentId) : {};

    this.setState({
      isLoading: false,
      all_categories: categories,
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
    // if (!topic || topic.owner.username !== user.username) {
    //   history.push('/new-topic');
    //   return {};
    // }

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
        title: 'Submit error',
        text: 'Topic title is required.'
      }
    });
  };

  setFlag = key => {
    const { flag } = this.state;
    if (flag !== key) this.setState({ flag: key });
  };

  getTopics = async (input, callback) => {
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
    const linkText = `${configs.server + configs.linkBase()}/topic/${id}/`;
    const link = `${configs.linkBase()}/split/topic/${id}`;
    const PopUpText = (
      <span onClick={this.refresh}>
        Your topic is available on:
        <Link to={link}> {linkText}</Link>
      </span>
    );

    this.setState({
      success: true,
      message: {
        title: 'Success',
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

  goBack = () => {
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
      all_categories,
      all_types,
      message,
      error,
      success,
      isLoading
    } = this.state;
    const { user } = this.props;

    if (isLoading) return <Loading />;

    const type = all_types[topic_type] || 'idea';

    const categories = all_categories.map(item => {
      const { name, url, definition } = item;
      return { value: name, label: name, url, definition };
    });

    const Buttons = () => {
      if (!user)
        return (
          <div>
            <p onClick={this.persistTopic}>
              <Link to="/page/otp">Sign in</Link> to post a topic.
            </p>
          </div>
        );

      return this.state.id ? (
        <div>
          <Button onClick={this.goBack} className="topic_view__back">
            &#10094; Back
          </Button>
          <Button type="submit"> &#9873; Save</Button>
          <Button
            className="topic_view__btn"
            onClick={() => this.showPopUp('delete')}
          >
            &#10006; Delete
          </Button>
        </div>
      ) : (
        <Button type="submit">&#9873; Create</Button>
      );
    };

    const DeletePopup = ({ isOpen, name }) => (
      <div>
        <Modal show={isOpen} className="topic_view__modal">
          <Modal.Header>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete this topic?</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.deleteTopic}>Delete</Button>
            <Button onClick={() => this.closeModal(name)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    const getPlaceHolder = type => `Share your ${type.toLowerCase()}`;

    return (
      <div className="main">
        <div className="topic_view__container">
          <form onSubmit={this.submitTopic}>
            <FormSelect
              name="topic_type"
              label="Type"
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
              <ControlLabel>Category</ControlLabel>
              <Select
                className="topic_view__select"
                name="topic_categories"
                clearable={false}
                resetValue={categories[0]}
                multi
                value={topic_categories}
                options={categories}
                onChange={this.selectCategory}
                optionRenderer={SelectOption}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>What's on your mind?</ControlLabel>
              <FormControl
                id="formControlsText"
                className="topic_view__field"
                type="text"
                name="topic_title"
                label="Title"
                value={topic_title}
                onChange={this.handleChange}
                placeholder="Topic title"
              />
              <TextEditor
                value={topic_text}
                handleValue={this.handleTopicText}
                placeholder={getPlaceHolder(type)}
              />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Parents</ControlLabel>
              <InputGroup>
                <Flag setFlag={this.setFlag} flag={flag} dropup />
                <Select.Async
                  className="topic_view__select"
                  name="topic_categories"
                  resetValue=""
                  multi
                  value={topic_parents}
                  loadOptions={this.getTopics}
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
              <ToggleButton value={false}>Public</ToggleButton>
              <ToggleButton value>Draft</ToggleButton>
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
        <MenuBar page="Menu" />
      </div>
    );
  }
}

export default TopicView;