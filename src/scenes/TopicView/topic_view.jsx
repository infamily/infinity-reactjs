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
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import MenuBar from 'scenes/MenuBar';
import Flag from 'components/FlagToggle';
import Loading from 'components/Loading';
import TextEditor from 'components/TextEditor/TopicEditor';
import FormSelect from 'components/FormSelect';
import { PopupModal } from './PopupModal';
import SelectOption from './SelectOption';
import topicViewService from 'services/topic_view.service';
import topicService from './services';
import { getMarkdown } from './helpers';
import { makeRawHtml } from 'services/common.services';
import configs from 'configs';
import './topic_view.css';
import 'react-select/dist/react-select.min.css';

class Topic extends Component {
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
        text: '',
      }
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    persistedTopic: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  async componentWillMount() {
    const { user, match, persistedTopic } = this.props;
    const id = match.params.id;
    const parent = match.params.p;
    this.setLoading(true);

    const categories = await topicViewService.getCategories();
    const editedData = (user && id) ? await this.getTopicData(id) : {};
    const parentData = parent ? await this.setParent(parent) : {};
    
    this.setState({
      all_categories: categories,
      id,
      ...persistedTopic,
      ...editedData,
      ...parentData,
      isLoading: false,
    });
  }

  setLoading = (bool) => {
    this.setState({ isLoading: bool });
  }

  async setParent(id) {
    const parent = await topicService.addParent(id);
    const type = parent.type + 1;
    const all = this.state.all_types.length;
    const childType = type < all ? type : parent.type;
    
    return {
      topic_parents: [parent],
      topic_type: childType,
    };
  }

  async getTopicData(id) {
    const { user, history } = this.props;
    const topic = await topicService.getTopic(id);
    
    // redirect if isn't owner 
    if (!topic || topic.owner.username !== user.username) {
      history.push('/new-topic');
      return {};
    };

    const topic_parents = await topicService.getParents(topic.parents);
    const topic_categories = await topicService.getCategories(topic.categories);

    return {
      topic_type: topic.type,
      topic_title: topic.title,
      topic_text: makeRawHtml(topic.body),
      is_draft: topic.is_draft,
      topic_categories,
      topic_parents,
    };
  }

  persistTopic = () => {
    const {
      topic_type,
      topic_title,
      topic_text,
      is_draft,
      topic_categories,
      topic_parents,
    } = this.state;

    const topic = {
      topic_type,
      topic_title,
      topic_text,
      is_draft,
      topic_categories,
      topic_parents,
    };

    this.props.persistTopic(topic);
  }

  formatData = () => {
    const {
      topic_type,
      topic_categories,
      topic_title,
      topic_text,
      topic_parents,
      is_draft,
    } = this.state;

    const formatted = array => array[0] ? array.map(item => item.url) : [];

    return {
      type: topic_type,
      title: topic_title,
      text: getMarkdown(topic_text),
      parents: formatted(topic_parents),
      categories: formatted(topic_categories),
      is_draft,
    };
  }

  showError = () => {
    this.setState({
      error: true,
      message: {
        title: 'Submit error',
        text: 'Topic title is required.',
      }
    });
  }

  submitTopic = async (e) => {
    e.preventDefault();
    const { match, clearTopic } = this.props;
    const { topic_title } = this.state;
    const edited_id = match.params.id;

    if (!topic_title.trim()) {
      this.showError();
      return;
    }

    const data = this.formatData();
    data.id = edited_id;

    const action = edited_id ? 'updateTopic' : 'createTopic';
    const topic = await topicViewService[action](data);
    
    if (topic) {
      const { id } = topic;
      const linkText = configs.server + configs.linkBase() + '/topic/' + id + '/';
      const link = configs.linkBase() + '/topic/' + id;
      const text = (
        <span onClick={this.refresh}>Your topic is available on: 
          <Link to={link}> {linkText}</Link>
        </span>
      );
      
      this.setState({
        success: true,
        message: {
          title: 'Success',
          text
        }
      });

      clearTopic();
    }
  }

  deleteTopic = async () => {
    const { match } = this.props;
    const edited_id = match.params.id;
    const result = await topicViewService.deleteTopic(edited_id);
    if (result === 'success') {
      this.props.history.push('/');
      this.refresh();
    };
  }

  refresh() {
    window.location.reload(false);    
  }
  
  getTopics = async (input, callback) => {
    const { flag } = this.state;
    const { results } = await topicViewService.search(input, flag);
    const options = results.map(topic => {
      const { title, url } = topic;
      return { label: title, value: title, url }
    });

    callback(null, {
      options: options, 
    });
  }; 

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  selectCategory = item => {
    item && this.setState({
      topic_categories: item
    });
  }

  selectParents = items => { 
    this.setState({
      topic_parents: items
    });
  }

  showPopUp = state => { 
    this.setState({
      [state]: true
    });
  }

  closeModal = state => {
    this.setState({ 
      [state]: false,
      message: {
        title: '',
        text: '',
      }
    });
    
    state === 'success' && window.location.replace('/');
  }

  setFlag = key => {
    const { flag } = this.state; 

    flag !== key &&
    this.setState({
      flag: key,
    });
  }

  onChangeDraft = value => {
    this.setState({
      is_draft: value
    });
  }

  handleTopicText = (html) => {
    this.setState({
      topic_text: html,
    });
  }
  
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
      isLoading,
    } = this.state;
    const { user } = this.props;

    if (isLoading) return <Loading />;

    const type = all_types[topic_type] || "idea";

    const categories = all_categories.map(item => {
      const { name, url, definition } = item;
      return { value: name, label: name, url, definition }
    });

    const Buttons = () => {
      if (!user) return (
        <div onClick={this.persistTopic}>
          <p><Link to="/page/otp">Sign in</Link> to post a topic.</p>
        </div>
      );

      return this.state.id
      ? <div>
          <Button type="submit">Edit</Button>
          <Button className="topic_view__btn" onClick={() => this.showPopUp('delete')}>Delete</Button>
        </div>
      : <Button type="submit">Create</Button>;
    };

    const DeletePopup = ({ isOpen, name }) =>
      <div >
        <Modal show={isOpen} className="topic_view__modal">
          <Modal.Header>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure want to delete this topic?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.deleteTopic}>Delete</Button>
            <Button onClick={() => this.closeModal(name)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>;

    const getPlaceHolder = () => {
      // 'Enter your ' + type.toLowerCase()
      return 'Share your ideas';
    };

    return (
      <div className="main">
        <div className="topic_view__container">
          <form onSubmit={this.submitTopic}>
            <FormSelect 
              name="topic_type" 
              label="Type" 
              action={this.handleChange} 
              value={topic_type}>
              {all_types.map((item, i) => {
                return <option value={i} key={item}>{item}</option>;
              })}        
            </FormSelect>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Category</ControlLabel> 
              <Select
                className="topic_view__select"
                name="topic_categories"
                clearable={false}
                resetValue={categories[0]}
                multi={true}                
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
                placeholder="Enter title"
              />
              <TextEditor 
                value={topic_text}
                handleValue={this.handleTopicText}
                placeholder={getPlaceHolder()}
              />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Parents</ControlLabel>
              <InputGroup>
                <Flag setFlag={this.setFlag} flag={flag} dropup/>
                <Select.Async
                  className="topic_view__select"
                  name="topic_categories"
                  resetValue=''
                  multi={true}
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
              onChange={this.onChangeDraft}>
              <ToggleButton value={false}>Public</ToggleButton>
              <ToggleButton value={true}>Draft</ToggleButton>
            </ToggleButtonGroup>
            <br /><br />
            <Buttons />
            </form>
          </div>
        <PopupModal isOpen={error} name="error" message={message} closeModal={this.closeModal} />
        <PopupModal isOpen={success} name="success" message={message} closeModal={this.closeModal} />
        <DeletePopup isOpen={this.state['delete']} name="delete"/>
        <ReactTooltip />
        <MenuBar page='Menu'/>
      </div>
    );
  }
}

export default Topic; 
