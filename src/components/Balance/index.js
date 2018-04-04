import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setBalance } from 'actions/user';
import Balance from './Balance';

function mapStateToProps(state) {
  return {
    balance: state.balance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setBalance: (data) => dispatch(setBalance(data)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Balance));
