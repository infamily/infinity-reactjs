import { connect } from 'react-redux';
import Home from './home';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Home);
