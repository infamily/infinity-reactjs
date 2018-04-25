import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { clearTopic, persistTopic } from 'actions/persistedTopic';
import { setUpdateTopicList } from 'actions/topicList';
import { changeText } from './actions';
import { getText } from './selectors';
import TopicView from './TopicView';

function mapStateToProps(state) {
  return {
    user: state.user,
    persistedTopic: state.persistedTopic,
    text: getText(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearTopic: () => dispatch(clearTopic()),
    persistTopic: topic => dispatch(persistTopic(topic)),
    setUpdateTopicList: bool => dispatch(setUpdateTopicList(bool)),
    changeText: text => dispatch(changeText(text))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopicView)
);
