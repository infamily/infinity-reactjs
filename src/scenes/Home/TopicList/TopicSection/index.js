import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TopicSection from './TopicSection';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps, null)(TopicSection));
