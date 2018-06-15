import { connect } from 'react-redux';
// import { setSplash } from 'actions/splash';
import SplashScreen from './SplashScreen';

function mapDispatchToProps(dispatch) {
  return {
    // setSplash: data => dispatch(setSplash(data))
  };
}

export default connect(null, mapDispatchToProps)(SplashScreen);
