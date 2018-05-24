import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setBalance } from 'actions/user';
import PayCheckout from './PayCheckout';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setBalance: data => dispatch(setBalance(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PayCheckout)
);
