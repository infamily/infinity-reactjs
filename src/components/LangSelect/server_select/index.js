import { connect } from 'react-redux';
import { setServer } from 'actions/server';
import { signIn } from 'actions/user';
import { withRouter } from 'react-router';
import ServerButton from './server';

function mapStateToProps(state) {
  return {
    server: state.server,
    userServerData: state.userServerData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setServer: (index) => dispatch(setServer(index)),
    signIn: (user) => dispatch(signIn(user)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerButton));
