import { connect } from 'react-redux';
import { signIn } from '../../actions/user';
import OtpLogin from './otp-login';

function mapStateToProps(state) {
  return {
    user: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: user => dispatch(signIn(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpLogin);
