import { connect } from 'react-redux';
import TopicList from './TopicList';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null)(TopicList);
