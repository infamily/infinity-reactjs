import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signOut } from '../../../actions/user';
import Account from './account';

function mapStateToProps(state) {
  return {
    token: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
