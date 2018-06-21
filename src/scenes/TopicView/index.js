import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { clearTopic, persistTopic } from 'actions/persistedTopic';
import { setUpdateTopicList } from 'actions/topicList';
import TopicView from './TopicView';

function mapStateToProps(state) {
  return {
    user: state.user,
    persistedTopic: state.persistedTopic
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearTopic: () => dispatch(clearTopic()),
    persistTopic: topic => dispatch(persistTopic(topic)),
    setUpdateTopicList: bool => dispatch(setUpdateTopicList(bool))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopicView)
);
