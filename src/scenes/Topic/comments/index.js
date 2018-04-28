import { connect } from 'react-redux';
import Comments from './comments';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps, null)(Comments));
