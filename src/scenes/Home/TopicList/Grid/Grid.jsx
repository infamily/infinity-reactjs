import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import './Grid.css';

// const breakpoints = splitState =>
//   !splitState ? { default: 3, 800: 2, 500: 1 } : { default: 2, 1000: 1 };
// const isSplit = props => props.location.pathname.includes('/split');

class Grid extends Component {
  constructor(props) {
    super(props);
    // this.state = { splitState: isSplit(props) };
  }

  static propTypes = {
    children: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    // const splitState = isSplit(this.props);

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
