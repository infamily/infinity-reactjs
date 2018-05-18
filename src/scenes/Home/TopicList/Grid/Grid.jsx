import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import './Grid.css';

class Grid extends PureComponent {
  static defaultProps = {
    children: null
  };

  static propTypes = {
    children: PropTypes.array,
    location: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    const GridComponent = () => (
      <div id="gird__container">
        <Masonry
          breakpointCols={{ default: 3, 900: 2, 500: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {children}
        </Masonry>
      </div>
    );
    return <GridComponent />;
  }
}

export default Grid;
