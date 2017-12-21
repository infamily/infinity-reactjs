import { connect } from 'react-redux';
import CommentForm from './comment_form';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(CommentForm);
