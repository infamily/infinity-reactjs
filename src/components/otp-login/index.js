import { connect } from 'react-redux';
import { saveToken } from '../../actions/user';
import OtpLogin from './otp-login';

function mapStateToProps(state) {
  return {
    token: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveToken: token => dispatch(saveToken(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpLogin);
