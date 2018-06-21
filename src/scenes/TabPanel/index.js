import { connect } from 'react-redux';
import TabPanel from './TabPanel';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null)(TabPanel);
