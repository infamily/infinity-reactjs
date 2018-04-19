import { connect } from 'react-redux';
import TopicView from './topic_view';
import { clearTopic, persistTopic } from 'actions/persistedTopic';
import { setUpdateTopicList } from 'actions/topicList';

function mapStateToProps(state) {
  return {
    user: state.user,
    persistedTopic: state.persistedTopic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearTopic: () => dispatch(clearTopic()),
    persistTopic: (topic) => dispatch(persistTopic(topic)),
    setUpdateTopicList: (bool) => dispatch(setUpdateTopicList(bool)),    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicView);
