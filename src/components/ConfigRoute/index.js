import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setServer } from 'actions/server';
import ConfigWrapper from './ConfigWrapper';

export default withRouter(connect(null, { setServer })(ConfigWrapper));