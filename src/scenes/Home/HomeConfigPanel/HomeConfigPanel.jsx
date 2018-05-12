import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import Flag from 'components/FlagToggle';
import Header from 'components/Header';
import langService from 'services/lang.service';
import topicService from 'services/topic.service';
import store_home from '../services/store_home';
import TopicSourceToggle from '../TopicSourceToggle';
import SettingsButton from '../SettingsButton';

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      content: langService.homeContent(),
      showSettings: true
    };
  }

  static defaultProps = { user: null };

  static propTypes = {
    user: PropTypes.object,
    updateTopicList: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    changeHomeParams: PropTypes.func.isRequired,
    homeParams: PropTypes.object.isRequired
  };

  onChangeTopicView = async topicSource => {
    const { flag } = this.state;
    this.props.setLoading(true);
    try {
      const topics = await topicService.getTopics(flag, topicSource);
      this.props.updateTopicList(topics);
      this.props.changeHomeParams({
        topicSource,
        page: 1
      });
    } catch (error) {
      console.log(error);
    }
    this.props.setLoading(false);
  };

  setFlag = async key => {
    const { flag, topicSource } = this.state;

    store_home.flag = key;

    if (flag !== key) {
      const topics = await topicService.getTopics(key, topicSource);
      this.props.updateTopicList(topics);
      this.props.changeHomeParams({ flag: key });
    }
  };

  makeSearch = async e => {
    e.preventDefault();
    const { query, flag, topicSource } = this.state;
    try {
      const topics = await topicService.search(query, flag, topicSource);
      this.props.updateTopicList(topics);
      this.props.changeHomeParams({
        page: 1
      });
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
  };

  handleSettings = () => {
    this.setState(prevState => ({
      showSettings: !prevState.showSettings
    }));
  };

  render() {
    const { user } = this.props;
    const { view } = this.props.homeParams;
    const { title, button } = this.state.content;
    const { flag, topicSource, showSettings } = this.state;

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
        <div className="home__settings">
          {showSettings && (
            <TopicSourceToggle
              onChangeTopicView={this.onChangeTopicView}
              handleTopicView={this.handleGridView}
              topicView={topicSource}
              view={view}
            />
          )}
        </div>
      </div>
    );
  }
}
