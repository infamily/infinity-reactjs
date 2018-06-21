import { connect } from 'react-redux';
import ShowCaseTopic from './ShowCaseTopic';

const mapStateToProps = state => ({
  user: state.user,
  server: state.server
});

export default connect(mapStateToProps, null)(ShowCaseTopic);
