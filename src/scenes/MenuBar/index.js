import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'components/Menu';
import LangSelect from 'components/LangSelect';
import './MenuBar.css';

export default class MenuBar extends Component {
  static propTypes = {
    page: PropTypes.string
  }

  render() {
    const { page } = this.props;

    const Bar = ({ mobile }) => (
      <div className={mobile && 'nav_bar'}>
        <Menu page={page} mobile={mobile} />
        <LangSelect mobile={mobile} />
      </div>
    );

    return (
      <div>
        <Bar mobile={true} />
        <Bar mobile={false} />
      </div>
    );
  }
}
