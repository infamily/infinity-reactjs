import { connect } from 'react-redux';
import { setUpdateTopicList } from 'actions/topicList';
import { setMainFull } from 'actions/settings';
import Home from './Home';

function mapStateToProps(state) {
  return {
    user: state.user,
    server: state.server,
    shouldUpdateTopicList: state.shouldUpdateTopicList,
    isMainFull: state.settings.isMainFull
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUpdateTopicList: bool => dispatch(setUpdateTopicList(bool)),
    setMainFull: bool => dispatch(setMainFull(bool))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
