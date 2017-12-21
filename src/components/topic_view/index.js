import { connect } from 'react-redux';
import TopicView from './topic_view';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(TopicView);
