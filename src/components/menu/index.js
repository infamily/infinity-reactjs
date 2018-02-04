import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signOut } from '../../actions/user';
import Menu from './menu';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
