import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import topicViewService from '../../services/topic_view.service.js';
import commentService from '../../services/comment.service.js';
import configs from '../../configs.js';

import Menu from '../utils/menu';
import Language from '../utils/lang_select';

import './topic_view.css';

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic_types: configs.types,
      topic_categories: [],
      topic_parents: [],
      
      topic_type: '',  
      topic_categorie: '',  
      topic_parent: '',  
      topic_title: '',  
      topic_text: '',  
    }

    this.clear = this.clear.bind(this);
  }

  static propTypes = { 
  };

  async componentWillMount() {
    const { user } = this.props;
    const categories = await topicViewService.getCategories(user.token);

    this.setState({
      topic_categories: categories,
    });
  }

  clear() {
    this.setState({
      comment_id: 0,
      comment_text: '',
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  render() {
    const user = this.props.user;
    const { topic_text, topic_title, topic_type, topic_categories, topic_types } = this.state;
    const Categories = () => topic_categories.map(item => {
      return <option value={item.name} key={item.url}>{item.name}</option>;
    });

    const Types = () => topic_types.map(item => {
      return <option value={item} key={item}>{item}</option>;
    });

    return (
      <div className="main">
        <div className="topic_view__container">
          <form onSubmit={this.submitComment}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Type</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <Types />
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Category</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <Categories />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>What's on your mind?</ControlLabel>
              <FormControl
                id="formControlsText"
                className="topic_view__field"
                type="text"
                name="topic_title"
                label="Title"
                placeholder="Enter title"
              />
              <FormControl
                componentClass="textarea"
                className="comment__text"
                rows="10"
                name="topic_text"
                placeholder={"Enter your " +( topic_type || "idea")}               
                value={topic_text}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Parents</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">...</option>
              </FormControl>
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