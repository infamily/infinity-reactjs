import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Button,
  Panel
} from 'react-bootstrap';
import Flag from 'components/FlagToggle';
import Header from 'components/Header';
import CategorySelect from 'components/CategorySelect';
import langService from 'services/lang.service';
import topicService from 'services/topic.service';
import TopicSourceToggle from './TopicSourceToggle';
import SettingsButton from './SettingsButton';
import { getQueryParameters, makeCategoriesArray } from '../helpers';
import './HomeConfigPanel.css';

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      content: langService.homeContent(),
      showSettings: true,
      query: ''
    };
  }

  static defaultProps = { user: null };

  static propTypes = {
    user: PropTypes.object,
    updateHomeTopics: PropTypes.func.isRequired,
    updateHomeTopicsByParams: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    changeHomeParams: PropTypes.func.isRequired,
    homeParams: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  updateSearchParams = () => {
    const { view, flag, topicSource, categories } = this.props.homeParams;
    const { query } = this.state;

    console.log(getQueryParameters(this.props.location.search));
    const categoriesArray = makeCategoriesArray(categories);
    const search = `?query=${query}&flag=${flag}&view=${view}&topicSource=${topicSource}&categories=${categoriesArray}`;
    this.props.history.push({ search });
  };

  onChangeTopicView = async topicSource => {
    await this.props.changeHomeParams({ topicSource });
    await this.props.updateHomeTopicsByParams();
    this.updateSearchParams();
  };

  setFlag = async key => {
    const { flag } = this.props.homeParams;
    if (flag !== key) {
      this.setState({ query: '' });
      await this.props.changeHomeParams({ flag: key });
      await this.props.updateHomeTopicsByParams();
      this.updateSearchParams();
    }
  };

  makeSearch = async e => {
    e.preventDefault();
    const { flag, topicSource, categories } = this.props.homeParams;
    const { query } = this.state;
    const categoryParams = makeCategoriesArray(categories);

    try {
      const topics = await topicService.search(
        query,
        flag,
        topicSource,
        categoryParams
      );
      this.props.updateHomeTopics(topics);
      this.updateSearchParams();
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleGridView = value => {
    this.props.changeHomeParams({ view: value });
    this.updateSearchParams();
  };

  handleSettings = () => {
    this.setState(prevState => ({
      showSettings: !prevState.showSettings
    }));
  };

  selectCategory = async item => {
    if (item) {
      await this.props.changeHomeParams({ categories: item });
      await this.props.updateHomeTopicsByParams();
      this.updateSearchParams();
    }
  };

  render() {
    const { user, homeParams } = this.props;
    const { showSettings, content } = this.state;
    const { view, flag, topicSource, categories } = homeParams;
    const { title, button } = content;

    return (
      <div className="home__head">
        <Header user={user} title={title} />
        <form onSubmit={this.makeSearch}>
          <FormGroup>
            <InputGroup>
              <Flag setFlag={this.setFlag} flag={flag} />
              <FormControl
                type="search"
                name="query"
                value={this.state.query}
                onChange={this.handleChange}
              />
              <div className="home_input__settings_btn">
                <SettingsButton action={this.handleSettings} />
              </div>
              <InputGroup.Button>
                <Button type="submit">{button}</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
        <Panel
          id="collapsible-data-panel"
          className="home__settings_panel main__shadow_box"
          expanded={showSettings}
          collapsible
          defaultExpanded={false}
        >
          <div className="home__settings">
            <TopicSourceToggle
              onChangeTopicView={this.onChangeTopicView}
              handleTopicView={this.handleGridView}
              topicSource={topicSource}
              view={view}
            />
            <div className="settings__category">
              <CategorySelect
                value={categories}
                action={this.selectCategory}
                placeholder="Select categories..."
              />
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}
