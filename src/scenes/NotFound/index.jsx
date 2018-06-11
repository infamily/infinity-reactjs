import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuBar from 'scenes/MenuBar';
import HomeButton from 'components/HomeButton';
import notFoundImg from 'images/notFound.png';
import messages from './messages';
import './NotFound.css';

const NotFound = props => (
  <div className="main">
    <HomeButton />
    <div className="not_found__box">
      <img src={notFoundImg} className="not_found__img" alt="notFound" />
      <h2>{props.text}</h2>
    </div>
    <MenuBar />
  </div>
);

NotFound.propTypes = {
  text: PropTypes.object
};

NotFound.defaultProps = {
  text: <FormattedMessage {...messages.noContent} />
};

export default NotFound;
