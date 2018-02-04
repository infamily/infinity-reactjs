import { connect } from 'react-redux';
import { setServer } from '../../../actions/server';
import Server from './server';

function mapStateToProps(state) {
  return {
    server: state.server
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setServer: (index) => dispatch(setServer(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Server);
