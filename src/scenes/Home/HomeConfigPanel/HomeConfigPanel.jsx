import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
import TopicSourceToggle from './TopicSourceToggle';
import SettingsButton from './SettingsButton';
import { validateHomeParams, makeCategoriesArray } from '../helpers';
import messages from './messages';
import store_home from '../services/store_home';
import './HomeConfigPanel.css';

export default class HomeConfigPanel extends Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
      query: ''
    };
  }

  static defaultProps = { user: null };

  static propTypes = {
    user: PropTypes.object,
    updateHomeTopicsByParams: PropTypes.func.isRequired,
    makeSearch: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    changeHomeParams: PropTypes.func.isRequired,
    homeParams: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  async componentWillMount() {
    this.updateConfigState();
  }

  async componentWillReceiveProps(nextProps) {
    const { search } = this.props.location;
    const nextSearch = nextProps.location.search;
    if (search !== nextSearch) {
      const params = validateHomeParams(nextSearch) || {};

      // clear all topic relatives params if they are still in store
      if (!params.childrenById) params.childrenById = null;
      if (!params.parentsById) params.parentsById = null;

      await this.props.changeHomeParams(params);
      store_home.home_scroll = 0;
      await this.props.updateHomeTopicsByParams();
    }
  }

  updateConfigState = () => {
    const { search } = this.props.location;
    const validParams = validateHomeParams(search);
    const query = validParams && validParams.query;
    if (query) this.setState({ query });
  };

  updateSearchParams = async () => {
    const { view, flag, topicSource, categories } = this.props.homeParams;
    const { query } = this.state;

    const categoriesArray = makeCategoriesArray(categories);

    let search = `?flag=${flag}&view=${view}&topicSource=${topicSource}`;
    if (query) search += `&query=${query}`;
    if (categories.length) search += `&categories=${categoriesArray}`;

    // reset parents/children params
    await this.props.changeHomeParams({
      childrenById: null,
      parentsById: null
    });
    this.props.history.push({ search });
  };

  onChangeTopicView = async topicSource => {
    await this.props.changeHomeParams({
      topicSource
    });
    await this.props.updateHomeTopicsByParams();
    this.updateSearchParams();
  };

  setFlag = async key => {
    const { flag } = this.props.homeParams;
    if (flag !== key) {
      this.setState({ query: '' });
      await this.props.changeHomeParams({
        flag: key,
        topicSource: 0
      });
      await this.props.updateHomeTopicsByParams();
      this.updateSearchParams();
    }
  };

  onSearchSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.makeSearch(query);
    this.updateSearchParams();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleGridView = async value => {
    await this.props.changeHomeParams({
      view: value
    });
    this.updateSearchParams();
  };

  handleSettings = () => {
    this.setState(prevState => ({
      showSettings: !prevState.showSettings
    }));
  };

  selectCategory = async item => {
    if (item) {
      await this.props.changeHomeParams({
        categories: item
      });
      await this.props.updateHomeTopicsByParams();
      this.updateSearchParams();
    }
  };

  render() {
    const { user, homeParams } = this.props;
    const { showSettings } = this.state;
    const { view, flag, topicSource, categories } = homeParams;

    return (
      <div className="home__confgi_panel">
        <Header user={user} />
        <form onSubmit={this.onSearchSubmit}>
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
                <Button type="submit">
                  <FormattedMessage {...messages.search} />
                </Button>
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
                placeholder={
                  <FormattedMessage {...messages.selectPlaceholder} />
                }
              />
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}
