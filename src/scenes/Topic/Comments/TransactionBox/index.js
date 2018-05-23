import { connect } from 'react-redux';
import { setBalance } from 'actions/user';
import Transaction from './TransactionBox';

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

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
