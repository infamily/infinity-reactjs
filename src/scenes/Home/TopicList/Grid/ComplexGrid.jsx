import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner as createCellPositioner,
  Masonry,
  WindowScroller,
  AutoSizer
} from 'react-virtualized';
import 'react-virtualized/styles.css';

export default class GridExample extends Component {
  constructor(props) {
    super(props);

    this.columnCount = 0;

    this.cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 250,
      fixedWidth: true
    });

    this.columnHeights = {};

    this.state = {
      columnWidth: 250,
      height: 300,
      gutterSize: 10,
      overscanByPixels: 0,
      windowScrollerEnabled: false
    };

    this.cellRenderer = this.cellRenderer.bind(this);
    this.onResize = this.onResize.bind(this);
    this.renderAutoSizer = this.renderAutoSizer.bind(this);
    this.renderMasonry = this.renderMasonry.bind(this);
    this.setMasonryRef = this.setMasonryRef.bind(this);
  }

  calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this.columnCount = Math.floor(this.width / (columnWidth + gutterSize));
  }

  cellRenderer({ index, key, parent, style }) {
    const list = this.props.children;
    const { columnWidth } = this.state;
    // const datum = list.get(index % list.size);
    const datum = list[index];

    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        <div
          style={
            { ...style, width: columnWidth } // className={styles.Cell}
          }
        >
          {datum}
        </div>
      </CellMeasurer>
    );
  }

  initCellPositioner() {
    if (typeof this.cellPositioner === 'undefined') {
      const { columnWidth, gutterSize } = this.state;

      this.cellPositioner = createCellPositioner({
        cellMeasurerCache: this.cache,
        columnCount: this.columnCount,
        columnWidth,
        spacer: gutterSize
      });
    }
  }

  onResize({ width }) {
    this.width = width;

    this.columnHeights = {};
    this.calculateColumnCount();
    this.resetCellPositioner();
    this.masonry.recomputeCellPositions();
  }

  renderAutoSizer({ height, scrollTop }) {
    this.height = height;
    this.scrollTop = scrollTop;

    const { overscanByPixels } = this.state;

    return (
      <AutoSizer
        // disableHeight
        // height={height}
        onResize={this.onResize}
        // overscanByPixels={overscanByPixels}
        // scrollTop={this.scrollTop}
      >
        {this.renderMasonry}
      </AutoSizer>
    );
  }

  renderMasonry({ width, height }) {
    this.width = width;
    this.height = height;
    console.log('height', height);

    this.calculateColumnCount();
    this.initCellPositioner();

    const {
      // height,
      overscanByPixels,
      windowScrollerEnabled
    } = this.state;
    const { children } = this.props;
    // const stateHeight = this.state.height;

    return (
      <Masonry
        cellCount={
          children.length // autoHeight={windowScrollerEnabled}
        }
        cellMeasurerCache={this.cache}
        cellPositioner={this.cellPositioner}
        cellRenderer={this.cellRenderer}
        height={
          height // height={windowScrollerEnabled ? this.height : height}
        }
        overscanByPixels={overscanByPixels}
        ref={this.setMasonryRef}
        scrollTop={this.scrollTop}
        width={width}
      />
    );
  }

  // to simulate newly loaded cells
  resetList = () => {
    this.cache.clearAll();
    this.resetCellPositioner();
    this.masonry.clearCellPositions();
  };

  resetCellPositioner() {
    const { columnWidth, gutterSize } = this.state;

    this.cellPositioner.reset({
      columnCount: this.columnCount,
      columnWidth,
      spacer: gutterSize
    });
  }

  setMasonryRef(ref) {
    this.masonry = ref;
  }

  render() {
    const {
      columnWidth,
      height,
      gutterSize,
      overscanByPixels,
      windowScrollerEnabled
    } = this.state;

    let child;

    if (windowScrollerEnabled) {
      child = (
        <WindowScroller overscanByPixels={overscanByPixels}>
          {this.renderAutoSizer}
        </WindowScroller>
      );
    } else {
      child = this.renderAutoSizer({ height });
    }

    return <div className="full_height">{child}</div>;
  }
}
