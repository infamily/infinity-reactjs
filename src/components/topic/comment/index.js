import { connect } from 'react-redux';
import Comment from './comment';

function mapStateToProps(state) {
  return {
    user: state
  }
}

export default connect(mapStateToProps, null)(Comment);
