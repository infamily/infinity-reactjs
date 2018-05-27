import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Grid.css';

class Grid extends PureComponent {
  static defaultProps = {
    children: null
  };

  static propTypes = {
    children: PropTypes.array
  };

  render() {
    const { children } = this.props;

    return <div className="grid_template__container">{children}</div>;
  }
}

export default Grid;
