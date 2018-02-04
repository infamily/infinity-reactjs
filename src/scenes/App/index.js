import { connect } from 'react-redux';
import { setServer } from '../../actions/server';
import App from './App';

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
