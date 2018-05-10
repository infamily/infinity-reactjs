import { connect } from 'react-redux';
import {
  changeFlag,
  changePage,
  changeQuery,
  changeTopicSource,
  changeView
} from '../data/actions';
import HomePanel from './HomePanel';

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
    changeFlag: bool => dispatch(changeFlag(bool))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePanel);
