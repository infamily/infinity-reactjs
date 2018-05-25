import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Menu from 'components/Menu';
import LangSelect from 'components/LangSelect';
import './MenuBar.css';

export default class MenuBar extends PureComponent {
  static propTypes = {
    page: PropTypes.object
  };

  render() {
    const { page } = this.props;

    const Bar = ({ mobile }) => (
      <div
        className={classNames('nav_bar', {
          'nav_bar--mobile': mobile
        })}
      >
        <Menu page={page} mobile={mobile} />
        <LangSelect mobile={mobile} />
      </div>
    );

    return (
      <div>
        <Bar mobile />
        <Bar mobile={false} />
      </div>
    );
  }
}
