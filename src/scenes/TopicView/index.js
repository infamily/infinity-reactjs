import { connect } from 'react-redux';
import TopicView from './topic_view';
import { clearTopic, persistTopic } from 'actions/persistedTopic';

function mapDispatchToProps(dispatch) {
  return {
    clearTopic: () => dispatch(clearTopic()),
    persistTopic: (topic) => dispatch(persistTopic(topic)),
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
    persistedTopic: state.persistedTopic,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicView);
