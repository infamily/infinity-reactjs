import { connect } from 'react-redux';
import Comments from './comments';

function mapStateToProps(state) {
  return {
    user: state
  }
}

export default connect(mapStateToProps, null)(Comments);
