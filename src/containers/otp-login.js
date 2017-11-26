import { connect } from 'react-redux';
import { signIn, singOut} from '../actions/user';
import OtpLogin from '../components/otp-login';

function mapStateToProps(state) {
  return {
    notes: state.Notes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNote: note => dispatch(addNote(note)),
    removeNote: id => dispatch(removeNote(id)),
    updateNote: (id, note) => dispatch(updateNote(id, note)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpLogin);
