import { connect } from 'react-redux';
import Comments from './comments';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Comments);
