import { connect } from 'react-redux';
import TopicView from './topic_view';

function mapStateToProps(state) {
  return {
    user: state
  }
}

export default connect(mapStateToProps, null)(TopicView);
