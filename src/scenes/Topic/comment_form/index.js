import { connect } from 'react-redux';
import { clearComment, persistComment } from 'actions/persistedComment';
import CommentForm from './comment_form';

function mapDispatchToProps(dispatch) {
  return {
    clearComment: () => dispatch(clearComment()),
    persistComment: (comment) => dispatch(persistComment(comment)),
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    persistedComment: state.persistedComment,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
