import { connect } from 'react-redux';
import Transaction from './transaction';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Transaction);
