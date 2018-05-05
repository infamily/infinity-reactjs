import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';

class Grid extends PureComponent {
  static propTypes = {
    children: PropTypes.array.isRequired
  };

  render() {
    const { children } = this.props;
    const isSplit = window.location.href.includes('/split');
    const breakpoints = !isSplit
      ? { default: 2, 800: 2, 500: 1 }
      : { default: 2, 1000: 1 };
    return (
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {children}
      </Masonry>
    );
  }
}

export default Grid;
