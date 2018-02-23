import { connect } from 'react-redux';
import { setServer } from 'actions/server';
import App from './App';

function mapStateToProps(state) {
  return {
    server: state.server,
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setServer: (api) => dispatch(setServer(api)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
