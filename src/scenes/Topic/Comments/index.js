import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Comments from './Comments';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps, null)(Comments));
