import { connect } from 'react-redux';
import Transaction from './transaction';
import { setBalance } from 'actions/user';

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
