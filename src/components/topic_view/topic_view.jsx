import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import topicViewService from '../../services/topic_view.service.js';
import configs from '../../configs.js';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

import Menu from '../utils/menu';
import Language from '../utils/lang_select';

import './topic_view.css';

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_types: configs.types,
      all_categories: [],
      
      topic_type: 1,  
      topic_categories: [],  
      topic_title: '',  
      topic_text: '',  
      topic_parents: [],  
    }

    this.submitTopic = this.submitTopic.bind(this);
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  async componentWillMount() {
    const { user } = this.props; 
    const categories = await topicViewService.getCategories(user.token);

    this.setState({
      all_categories: categories,
    });
  }

  async submitTopic(e) {
    e.preventDefault();
    const { user } = this.props;

    const {
      topic_type,
      topic_categories,
      topic_title,
      topic_text,
      topic_parents,
    } = this.state;

    const data = {
      type: topic_type,
      title: topic_title,
      text: topic_text,
    };

    data.parents = topic_parents[0] ? topic_parents.map(item => item.url) : [];
    data.categories = topic_categories[0] ? topic_categories.map(item => item.data.url) : []; 
      
    await topicViewService.createTopic(data, user.token);
    this.props.history.push('/');
  }
  
  async getTopics(input, callback) {
    const { results } = await topicViewService.search(input);
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
  
  render() {
    const { 
      topic_type, 
      topic_categories, 
      topic_title, 
      topic_text,
      topic_parents,
      all_categories, 
      all_types 
    } = this.state;
    
    const type = all_types[topic_type - 1].toLowerCase() || "idea";

    const Types = () => all_types.map((item, i) => {
      return <option value={i + 1} key={item}>{item}</option>;
    });
    
    const categories = all_categories.map(item => {
      return { value: item.name, label: item.name, data: item }
    });

    return (
      <div className="main">
        <div className="topic_view__container">
          <form onSubmit={this.submitTopic}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Type</ControlLabel>
              <FormControl 
                name="topic_type"
                componentClass="select" 
                value={topic_type} 
                onChange={this.handleChange}>
                <Types />
              </FormControl>
            </FormGroup>
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
              <FormControl
                componentClass="textarea"
                className="comment__text"
                rows="10"
                name="topic_text"
                placeholder={"Enter your " + type}               
                value={topic_text}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Parents</ControlLabel>
              <Select.Async
                className="topic_view__select"
                name="topic_categories"
                resetValue=''
                multi={true}
                value={topic_parents}
                loadOptions={this.getTopics}
                onChange={this.selectParents}
              />
            </FormGroup>
            <Button type="submit">Create</Button>
            </form>
          </div>
        <Language />
        <Menu page='Menu'/>
      </div>
    );
  }
}

export default Topic; 