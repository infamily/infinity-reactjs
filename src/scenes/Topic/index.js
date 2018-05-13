import { connect } from 'react-redux';
import Topic from './Topic';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null)(Topic);
