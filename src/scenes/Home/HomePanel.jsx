import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import Flag from 'components/FlagToggle';
import Header from 'components/Header';
import langService from 'services/lang.service';
import topicService from 'services/topic.service';
import store_home from './services/store_home';
import TopicViewToggle from './TopicViewToggle';
import SettingsButton from './SettingsButton';

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      search: langService.current,
      content: langService.homeContent(),
      page: store_home.home_page || 1,
      flag: store_home.flag || 0,
      query: '',
      topicView: 1,
      showSettings: true
    };
  }

  static propTypes = {
    updateTopicList: PropTypes.object,
    view: PropTypes.string.isRequired,
    updateTopicList: PropTypes.func.isRequired
  };

  onChangeTopicView = async topicView => {
    const { flag } = this.state;
    this.setState({ loading: true });
    try {
      const topics = await topicService.getTopics(flag, topicView);

      this.setState({
        topicView,
        topics,
        last_pack: topics,
        page: 1
      });
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  };

  setFlag = async key => {
    const { flag, topicView } = this.state;

    store_home.flag = key;

    if (flag !== key) {
      const topics = await topicService.getTopics(key, topicView);
      this.setState({ flag: key, topics });
    }
  };

  makeSearch = async e => {
    e.preventDefault();
    const { query, flag, topicView } = this.state;
    try {
      const topics = await topicService.search(query, flag, topicView);
      this.setState({
        topics,
        last_pack: topics,
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
    this.setState({ view: value });
  };

  handleSettings = () => {
    this.setState(prevState => ({
      showSettings: !prevState.showSettings
    }));
  };

  render() {
    const { user, view } = this.props;
    const { title, button } = this.state.content;
    const { flag, topicView, showSettings } = this.state;

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
            <TopicViewToggle
              onChangeTopicView={this.onChangeTopicView}
              handleTopicView={this.handleGridView}
              topicView={topicView}
              view={view}
            />
          )}
        </div>
      </div>
    );
  }
}
