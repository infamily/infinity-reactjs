import { connect } from 'react-redux';
import { setUpdateTopicList } from 'actions/topicList';
import { setMainFull } from 'actions/settings';
import { changeHomeParams } from './data/actions';
import { getHomeParams } from './data/selectors';
import Home from './Home';

function mapStateToProps(state) {
  return {
    user: state.user,
    server: state.server,
    shouldUpdateTopicList: state.shouldUpdateTopicList,
    isMainFull: state.settings.isMainFull,
    homeParams: getHomeParams(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUpdateTopicList: bool => dispatch(setUpdateTopicList(bool)),
    setMainFull: bool => dispatch(setMainFull(bool)),
    changeHomeParams: params => dispatch(changeHomeParams(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
