import { connect } from 'react-redux';
import { signIn } from 'actions/user';
import OtpLogin from './OtpLogin';

function mapStateToProps(state) {
  return {
    user: state.user,
    persistedComment: state.persistedComment,
    persistedTopic: state.persistedTopic
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: user => dispatch(signIn(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpLogin);
