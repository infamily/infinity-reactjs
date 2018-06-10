import { connect } from 'react-redux';
import Topic from './Topic';

const mapStateToProps = state => ({
  user: state.user,
  server: state.server
});

export default connect(mapStateToProps, null)(Topic);
