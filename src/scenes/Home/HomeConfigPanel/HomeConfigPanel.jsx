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
import { getQueryParameters, makeCategoriesArray } from './helpers';
import './HomeConfigPanel.css';

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      content: langService.homeContent(),
      showSettings: false,
      categories: [],
      query: ''
    };
  }

  static defaultProps = { user: null };

  static propTypes = {
    user: PropTypes.object,
    updateHomeTopics: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    changeHomeParams: PropTypes.func.isRequired,
    homeParams: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  updateSearchParams = () => {
    const { view, flag, topicSource } = this.props.homeParams;
    const { query, categories } = this.state;

    console.log(getQueryParameters(this.props.location.search));
    const categoriesArray = makeCategoriesArray(categories);

    const search = `?query=${query}&flag=${flag}&view=${view}&topicSource=${topicSource}&categories=${categoriesArray}`;
    this.props.history.push({ search });
  };

  onChangeTopicView = async topicSource => {
    const { flag } = this.props.homeParams;
    this.props.setLoading(true);
    try {
      const topicData = await topicService.getTopics(flag, topicSource);
      this.props.updateHomeTopics(topicData);
      this.props.changeHomeParams({
        topicSource
      });
      this.updateSearchParams();
    } catch (error) {
      console.log(error);
    }
    this.props.setLoading(false);
  };

  setFlag = async key => {
    const { flag, topicSource } = this.props.homeParams;

    if (flag !== key) {
      const topicData = await topicService.getTopics(key, topicSource);
      this.setState({ query: '' });
      this.props.updateHomeTopics(topicData);
      this.props.changeHomeParams({ flag: key });
      this.updateSearchParams();
    }
  };

  makeSearch = async e => {
    e.preventDefault();
    const { flag, topicSource } = this.props.homeParams;
    const { query } = this.state;

    try {
      const topics = await topicService.search(query, flag, topicSource);
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
      await this.setState({ categories: item });
      console.log('here', this.props.homeParams.categories);
      this.updateSearchParams();
    }
  };

  render() {
    const { user, homeParams } = this.props;
    const { showSettings, content, categories } = this.state;
    const { view, flag, topicSource } = homeParams;
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
