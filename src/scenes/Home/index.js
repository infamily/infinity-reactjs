import { connect } from 'react-redux';
import { setUpdateTopicList } from 'actions/topicList';
import Home from './home';

function mapStateToProps(state) {
  return {
    user: state.user,
    server: state.server,
    shouldUpdateTopicList: state.shouldUpdateTopicList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUpdateTopicList: bool => dispatch(setUpdateTopicList(bool))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
