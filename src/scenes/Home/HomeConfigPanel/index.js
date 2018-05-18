import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeHomeParams } from '../data/actions';
import { getHomeParams } from '../data/selectors';
import HomeConfigPanel from './HomeConfigPanel';

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
    changeHomeParams: params => dispatch(changeHomeParams(params))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeConfigPanel)
);
