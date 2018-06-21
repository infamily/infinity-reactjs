import { connect } from 'react-redux';
import { setServer } from 'actions/server';
import DefaultWrapper from './DefaultWrapper';

function mapStateToProps(state) {
  return {
    server: state.server
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setServer: api => dispatch(setServer(api))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultWrapper);
