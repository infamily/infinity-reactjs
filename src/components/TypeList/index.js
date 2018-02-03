import { connect } from 'react-redux';
import TypeList from './TypeList';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(TypeList);
