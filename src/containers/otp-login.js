import { connect } from 'react-redux';
import { signIn, singOut} from '../actions/user';
import OtpLogin from '../components/otp-login';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveToken: token => dispatch(saveToken(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpLogin);
