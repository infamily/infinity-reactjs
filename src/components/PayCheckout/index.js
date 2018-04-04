import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PayCheckout from './PayCheckout';
import { setBalance } from 'actions/user';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setBalance: (data) => dispatch(setBalance(data)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PayCheckout));
